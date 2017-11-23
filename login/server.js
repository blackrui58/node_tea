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



server.post('/login',function (req,res) {
	// { username: '222', pwd: '3333' }
	console.log(req.body);
	// 拿到输入框里面的内容,判断是否和数据库里面的数据一致
	// 如果一致,{error: 0,msg: '登录成功'}
	// 如果不一致,{error: 1,msg: '用户名或者密码错误'}
	// 就算账号 密码正确,需要跳转到主页
	// {error: 1,msg: '账号或者密码错误'}
	// {error: 0,msg: '登录成功'}
	// 种一个session
	req.session.token = req.body;
	// 登录失败,得把token的值设置为null
	res.send({error: 0,msg: '登录成功'});
	// res.send({error: 1,msg: '用户名或者密码错误'});
});

// 获取token
server.get('/token',function (req,res) {
	res.send(req.session.token);
});
































