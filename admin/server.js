var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var common = require('./libs/common.js');

var server = express();
server.listen(808);

// 静态文件
server.use(express.static('www/'));


// 连接数据库
var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'class74',
	// 时间转字符串的形式
	dateStrings: true
});

// 解析post数据
server.use(bodyParser.urlencoded({extended: true}));

// cookie以及session
server.use(cookieParser());

server.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'njdaksjdlakjdlk',
	// cookie: {maxAge: 3 * 60 * 1000} // 三分钟免登陆
	cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}));

// 文件上传
var obj = multer({dest: 'www/upload/'});
server.use(obj.any());

server.post('/login',function (req,res) {
	console.log(req.body);
	
	//{ username: '111', pwd: '2222' }
	var {username,pwd,checked} = req.body;

	var jiaPWD = common.md5(pwd+'huayanghai');

	var SQL = `SELECT * FROM admin WHERE name='${username}' AND pwd='${jiaPWD}'`;

	// 从数据库里面查找
	db.query(SQL,function (err,data) {
		if (err) {
			console.log('数据库错误',err);
			res.status(500);
		} else {
			if (data.length > 0) {
				
				// 登录成功
				// 判断是否勾选了记住密码
				if (checked == 'true') {
					req.session.token = req.body;
				} else {
					req.session.token = null;
				}
				res.send({error: 0,msg: '登录成功'});
			} else {
				req.session.token = null;
				// 登录失败
				res.send({error: 1,msg: '用户名或者密码错误'})
			}
		}
	});
});

// 获取token
server.get('/token',function (req,res) {
	res.send(req.session.token);
});

// 获取图书信息
//   /detail?count=5&page=1

// 传到前台的数据: data,  total_count  page
server.get('/detail',function (req,res) {
	
	
	//　获取总数据个数
	db.query(`SELECT COUNT (*) AS c FROM book`,function (err,data) {
		if (err) {
			res.status(500);
			res.send(err);
		} else {
		 	console.log(22);
			// 总数据
			var total_count = data[0].c;
			
			// count
			var count = req.query.count || 5;
			
			// 总页数
			var total_page = Math.ceil(total_count / count);
			
			// page
			var page = req.query.page || 1;
			
			if (page > total_page) {
				page = total_page;
			}
			
			var SQL1 = `SELECT * FROM book ORDER BY id DESC LIMIT ${(page - 1) * count},${count}`;
			db.query(SQL1,function (err,data) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					// 发送数据
					res.send({data,total_count,page});
				}
			});
			
		}
	});
	
	
	
});

// 删除
// /delete?id=1

server.get('/delete',function (req,res) {
	
	var {id} = req.query;
	
	db.query(`DELETE FROM book WHERE id='${id}'`,function (err,data) {
		if (err) {
			res.send(err);
		} else {
			res.send({error: 0,msg: '删除成功'});
		}
	});
	
});

// 添加数据
server.post('/add',function (req,res) {
	
	var {title,author,date,content} = req.body;
	var SQL = `INSERT INTO book (title,author,date,content) VALUES ('${title}','${author}','${date}','${content}')`;
	db.query(SQL,function (err,data) {
		if (err) {
			res.send(err);		
		} else {
			res.send('插入成功');
		}
	});

});

// 更新
//  /update?名字 作者  内容  日期

server.post('/update',function (req,res) {
	
	var {title,author,date,content,id} = req.body;
	
	var SQL = `UPDATE book SET title= '${title}',author= '${author}',date= '${date}',content= '${content}' WHERE id='${id}'`;
	
	db.query(SQL,function (err,data){
		if (err) {
			res.send(err);
		} else {
			res.send('更新成功');
		}
	});
	

});
