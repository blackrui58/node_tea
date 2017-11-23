var express = require('express');

// 获取body-parser中间件
var bodyParser = require('body-parser');

var mysql = require('mysql');

var server = express();

var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'class74'
});

server.listen(8080);

// 现在use方法里面调用一次
server.use(bodyParser.urlencoded({extended: true}));

server.post('/reg',function (req,res) {
	// 只能解析拼接url地址后面参数(get)
	// console.log(req.query);
	// 解析post
	// console.log(req.body);
	var {username,pwd} = req.body;

	// 判断数据库里面有没有这个用户名
	var SQL = `SELECT * FROM admin WHERE username='${username}'`;
	db.query(SQL,function (err,data) {
		if (err) {
			console.log('数据库问题',err);
		} else {
			if (data.length > 0) {
				// 有
				res.send({error: 1,msg: '此用户名已被占用'});
			} else {
				// 插入数据库
				var SQL1 = `INSERT INTO admin (username,pwd) VALUES ('${username}','${pwd}')`;
				db.query(SQL1,function (err) {
					if (err) {
						console.log('插入失败',err);
					} else {
						console.log('插入成功');
					}
				});
				res.send({error: 0,msg: '注册成功'});
			}
		}
	})
});