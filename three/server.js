var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var mysql = require('mysql');
var crypto = require('crypto');

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



// 查找所有的
// server.get('/in_theaters',function (req,res) {

// 	// 从数据库查找数据
// 	db.query(`SELECT * FROM in_theaters`,function (err,data) {
// 		if (err) {
// 			res.status(500);
// 			res.send('数据库正在维护');
// 		} else {

// 			// 字符串--> 对象
// 			data.forEach(function (ele) {
// 				ele.directors = JSON.parse(ele.directors);
// 				ele.images = JSON.parse(ele.images);
// 				ele.rating = JSON.parse(ele.rating);
// 			});

			
// 			// 返回数据
// 			res.send({total: 33,data});
// 		}
// 	});
// });

// 分页
// in_theaters?count=5&page=1
server.get('/in_theaters',function (req,res) {
	var SQL = `SELECT COUNT(*) AS c FROM in_theaters`;	
	db.query(SQL,function (err,data) {
		if (err) {
			res.status(500);
			res.send('数据库正在维护');
		} else {
			console.log(data);
			// 总数据
			var total = data[0].c;
			// count
			var count = req.query.count || 5;
			// page
			var page = req.query.page || 1;
			var SQL = `SELECT * FROM in_theaters LIMIT ${(page - 1) * count},${count}`;
			db.query(SQL,function (err,data) {
				if (err) {
					res.status(500);
					res.send('数据库正在维护');
				} else {
					// 字符串--> 对象
					data.forEach(function (ele) {
						ele.directors = JSON.parse(ele.directors);
						ele.images = JSON.parse(ele.images);
						ele.rating = JSON.parse(ele.rating);
					});
					// 在前端: 通过ajax获取
					res.send({total,data});
				}
			});

		}
	});
});

// 即将上映的数据
server.get('/coming_soon',function (req,res) {
	var SQL = `SELECT COUNT(*) AS c FROM coming_soon`;	
	db.query(SQL,function (err,data) {
		if (err) {
			res.status(500);
			res.send('数据库正在维护');
		} else {
			console.log(data);
			// 总数据
			var total = data[0].c;
			// count
			var count = req.query.count || 5;
			// page
			var page = req.query.page || 1;
			var SQL = `SELECT * FROM coming_soon LIMIT ${(page - 1) * count},${count}`;
			db.query(SQL,function (err,data) {
				if (err) {
					res.status(500);
					res.send('数据库正在维护');
				} else {
					// 字符串--> 对象
					data.forEach(function (ele) {
						ele.directors = JSON.parse(ele.directors);
						ele.images = JSON.parse(ele.images);
						ele.rating = JSON.parse(ele.rating);
					});
					// 在前端: 通过ajax获取
					res.send({total,data});
				}
			});

		}
	});
});

// top250的数据
server.get('/top250',function (req,res) {
	var SQL = `SELECT COUNT(*) AS c FROM top250`;	
	db.query(SQL,function (err,data) {
		if (err) {
			res.status(500);
			res.send('数据库正在维护');
		} else {
			console.log(data);
			// 总数据
			var total = data[0].c;
			// count
			var count = req.query.count || 5;
			// page
			var page = req.query.page || 1;
			var SQL = `SELECT * FROM top250 LIMIT ${(page - 1) * count},${count}`;
			db.query(SQL,function (err,data) {
				if (err) {
					res.status(500);
					res.send('数据库正在维护');
				} else {
					// 字符串--> 对象
					data.forEach(function (ele) {
						ele.directors = JSON.parse(ele.directors);
						ele.images = JSON.parse(ele.images);
						ele.rating = JSON.parse(ele.rating);
					});
					// 在前端: 通过ajax获取
					res.send({total,data});
				}
			});

		}
	});
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