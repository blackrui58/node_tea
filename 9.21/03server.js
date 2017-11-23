var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// 获取multer
var multer = require('multer');

var server = express();

server.listen(8080);

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

// 解析上传文件
// dest: 上传文件的目的地
var obj = multer({dest: 'www/upload/'});
// 接受文件的类型
server.use(obj.any());

//路由

server.post('/file',function (req,res) {
	// res.send('123');
	console.log(req.files);
})

// 静态文件
server.use(express.static('www/'));