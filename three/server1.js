var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var mysql = require('mysql');
var crypto = require('crypto');
var common = require('./lib/common');

//监听端口
var server = express();
server.listen(8080);

// 静态文件
server.use(express.static('www/'));// public


//连接数据库
var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'class74'
});

// 解析post数据
server.use(bodyParser.urlencoded({extended: true}));

// 多文件上传
var obj = multer({dest: 'www/upload/'});

server.use(obj.any());

// cookie
server.use(cookieParser());

server.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'sdsadsadsa',
	cookie: {maxAge: 7 * 1000000}
}));




// 分页
// in_theaters?count=5&page=1
server.get('/in_theaters',function (req,res) {
	// 发送数据
	common.sendData(db,req,res);
});
server.get('/coming_soon',function (req,res) {
	// 发送数据
	common.sendData(db,req,res);
});
server.get('/top250',function (req,res) {
	// 发送数据
	common.sendData(db,req,res);
});


// 详情:/detail?id=24753477

server.get('/detail',function (req,res) {
	var id = req.query.id;
	db.query(`SELECT * FROM movie_detail WHERE id='${id}'`,function (err,data) {
		if (err) {
			res.status(500);
			res.send('数据库问题')
		} else {
			// console.log(data);
			data[0].images = JSON.parse(data[0].images);
			res.send(data[0]);
		}
	});
})