var express = require('express');

var mysql = require('mysql');

var bodyParser = require('body-parser');

// 创建服务
var server = express();

server.listen(8080);

// 连接数据库
var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'class74',
	user: 'root',
	password: ''
});

// 要想解析post数据,必须使用bodyParser中间件
server.use(bodyParser.urlencoded({extended: true}));


// get : /in_theaters
server.get('/in_theaters',function (req,res) {
	// req.query
})

server.post('/reg',function (req,res) {
	// req.body
})


//静态文件
server.use(express.static('www/'));
