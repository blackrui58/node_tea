var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

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
//路由
server.post('/login',function (req,res) {
	// { username: 'wwww', pwd: '111' }
	var {username,pwd} = req.body;

	var SQL = `SELECT * FROM admin WHERE username='${username}' AND pwd='${pwd}'`;
	db.query(SQL,function (err,data){
		if (err) {
			console.log('数据库错误',err);
			// 状态码
			res.status(500);
		} else {
			if (data.length > 0) {
				res.send({error: 0,msg:'登录成功'}); 
			} else {
				res.send({error: 1,msg: '用户名或者密码错误'});
			}
		}
	});

})


// 静态文件
server.use(express.static('www/'));