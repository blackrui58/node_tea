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
	// { act: 'del', id: '10',page: '2' }
	var {act,id,page} = req.query;
	// 删除操作
	if (act == 'del') {
		db.query(`DELETE FROM user WHERE id='${id}'`,function (err,data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				// res.send('删除成功');
				res.redirect('/admin/detail?page='+page);
			}
		});
	} else if (act == 'update') {
		// 获取到数据库的数据
		var id = req.query.id;
		db.query(`SELECT * FROM user WHERE id='${id}'`,function (err,data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				// 跳转到更新界面
				var json = data[0];

				res.render('update',{json,id});
			}
		});
		
	}else {
		console.log(222);
		next();
	}
});



// 显示内容
server.get('/admin/detail',function (req,res) {
	
	var token = req.session.token.username;
	// 获取数据的总个数
	db.query(`SELECT COUNT (*) AS c FROM user`,function (err,data) {
		if (err) {
			res.status(500);
			res.send(err);
		} else {
			// 数据总个数
			var total = data[0].c;
			var count = 3;
			// 总共几页
			var total_page = Math.ceil(total / count);
			// 第几页
			var page = req.query.page || 1;
			if (page >= total_page) {
				page = total_page;
			}
			var SQL = `SELECT * FROM user LIMIT ${(page - 1) * count},${count}`;
			// 获取每页的数据
			db.query(SQL,function (err,data) {
				if (err) {
					res.status(500);
					res.send(err);
				} else {
					res.render('detail',{username: token,data,total_page,page});
				}
			});
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

// 写个post,用来更新数据
server.post('/admin/update',function (req,res) {
	var id = req.query.id;
	// req.body: { name: '猴子', age: '55', sex: '女', job: '法师', price: '55555' }
	// req.files: [0].filename
	var {name,age,sex,job,price} = req.body;
	var filename = '/upload/'+req.files[0].filename;
	var SQL = `UPDATE user SET name='${name}',age='${age}',sex='${sex}',job='${job}',price='${price}',icon='${filename}' WHERE id='${id}'`;
	// 更新
	db.query(SQL,function (err,data) {
		if (err) {
			res.status(500);
			res.send(err);
		} else {
			// res.send('更新成功');
			// 重定向到显示的界面
			res.redirect('/admin/detail');
		}
	});
});

// 退出登录
server.get('/loginout',function (req,res){
	// 去除session保存的token值
	req.session.token = null;
	res.redirect('/admin');
});




































