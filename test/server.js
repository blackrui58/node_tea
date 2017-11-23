var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var crypto = require('crypto');

var server = express();
server.listen(8080);

// 静态文件
server.use(express.static('www/'));

// 设置目录
server.set('views','www/views/');
// 是否开启缓存
server.set('view cache',true);
// 模板的类型
server.set('view engine','ejs');

// 连接数据库
var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'class74'
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
//监听任意接口
server.use(function (req,res,next) {
	// console.log(req.session.token);
	if (req.session.token) { 
		//登录
		next();
	} else {
		// 没登录
		if (req.url == '/admin') {
			next();
		} else {
			res.redirect('/admin');
		}
	}
});


// 登录
server.get('/admin',function (req,res) {
	console.log(222);
	// 模板的名字   数据
	res.render('login');
});

// 登录验证
server.post('/admin',function (req,res) {
	//{ username: '111', pwd: '2222' }
	var {username,pwd} = req.body;
	// 加密
	// 设置加密的方式
	var jiami = crypto.createHash('md5');
	// 加密
	jiami.update(pwd+'huayanghai');

	var jiaPWD = jiami.digest('hex');

	var SQL = `SELECT * FROM admin WHERE name='${username}' AND pwd='${jiaPWD}'`;

	// 从数据库里面查找
	db.query(SQL,function (err,data) {
		if (err) {
			console.log('数据库错误',err);
			res.status(500);
		} else {
			if (data.length > 0) {
				// 成功以后,记录成功的状态 (session)
				req.session.token = {username,pwd}; 
				// 重定向: 跳转到对应的接口里面
				res.redirect('/admin/detail');
			} else {
				// 
				// res.render('login');
				res.redirect('/admin');
			}
		}
	});
})

// 详情: admin/detail  删除
server.get('/admin/detail',function (req,res,next) {
	// { act: 'del', id: '10' }
	var {act,id} = req.query;
	// 删除操作
	if (act == 'del') {
		db.query(`DELETE FROM user WHERE id='${id}'`,function (err,data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				// res.send('删除成功');
				res.redirect('/admin/detail');
			}
		});
	} else {
		next();
	}
});

// 显示内容
server.get('/admin/detail',function (req,res) {
	
	var token = req.session.token.username;

	// 数据库里面的表信息
	db.query(`SELECT * FROM user`,function (err,data) {
		if (err) {
			res.status(500);
			res.send('404');
		} else {
			console.log(data);
			res.render('detail',{username: token,data: data});
		}
	});
	
});


// 提交的接口
server.post('/admin/detail',function (req,res) {
	// { name: 'aaa', age: '5', sex: '女', job: '奶妈', price: '33333' }
	var {name,age,sex,job,price} = req.body;
	var filename = '/upload/'+req.files[0].filename;

	var SQL = `INSERT INTO user (name,age,sex,job,price,icon) VALUES ('${name}','${age}','${sex}','${job}','${price}','${filename}')`;
		// 添加数据库
	db.query(SQL,function (err,data) {
		if (err) {
			res.status(500);
			res.send(err);
		} else {
			res.redirect('/admin/detail');
		}
	});
	
});




































