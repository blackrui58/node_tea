var express = require('express');
var mysql = require('mysql');

var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'class74'
});

// 创建服务
var server = express();
server.listen(8080);

// 注册的接口
server.get('/reg',function (req,res) {
	/*
	2.判断数据库里面是否有用户名
	3.如果有,则返回 {error: 1,msg: 此用户名已被占用}
	4.如果没有,则返回  {error: 0,msg: 注册成功}
	5.添加到数据库
	*/
	// 用户名 req.query: { username: 'qqq', pwd: '1234' }
	console.log(req.query);
	var {username,pwd} = req.query;
	var SQL = `SELECT * FROM admin WHERE username='${username}'`;
	// 在数据库里面查询:
	db.query(SQL,function (err,data) {
		if (err) {
			console.log('数据库错误',err);
		} else {
			// 有的情况下
			if (data.length > 0) {
				console.log(111);
				res.send({error: 1,msg: '此用户名已被占用'});
			} else {
				// 不存在该数据,插入数据库
				console.log(22);
				
				var SQL1 = `INSERT INTO admin (username,pwd) VALUES ('${username}','${pwd}')`;
				//添加数据库
				db.query(SQL1,function (err,data) {
					if (err) {
						console.log('插入失败');
					} else {
						console.log('插入成功');
					}
				})
				res.send({error: 0,msg: '注册成功'});
			}
		}
	})
})