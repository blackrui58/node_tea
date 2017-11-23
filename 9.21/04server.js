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

// 静态文件
server.use(express.static('www/'));

// 路径
server.set('views','www/views');
// 是否开启缓存
server.set('view cache',true);
// 模板的类型
server.set('view engine','ejs');

//路由
server.get('/admin',function (req,res) {
	// 渲染视图
	// res.render(模板的路径,数据);
	res.render('login',{a:1,b:2,arr: [1,2,3,4,5,6]});
});


