// 获取mysql模块
var mysql = require('mysql');

// 与数据库建立连接
var db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'class74',
	user: 'root',
	password: ''
});

// sql语句
// var SQL = `SELECT * FROM admin WHERE username='aaa'`;
var SQL = `INSERT INTO admin (username,pwd) VALUES ('ccc','123456')`;

db.query(SQL,function (err,data) {
	if (err) {
		console.log('数据正在维护');
	} else {
		console.log('数据插入成功',data);
	}
});