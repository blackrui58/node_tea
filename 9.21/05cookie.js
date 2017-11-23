
var express = require('express');
// 获取
var cookieParser = require('cookie-parser');

// 获取
var session = require('express-session');

var server = express();

server.listen(8080);

// 调用一次cookieParser
server.use(cookieParser());

server.use(session({
	resave: true, 
	saveUninitialized: false,
	secret: '123',
	cookie: {maxAge: 1000 * 180}
}));


// server.get('/sss',function (req,res) {
// 	console.log(req.cookies.token);
// 	if (!req.cookies.token) {
// 		// name,value,配置{maxAge: ms}
// 		res.cookie('token','1104',{maxAge: 3 * 60 * 1000});
// 	}
// 	res.send(req.cookies.token);
// })

server.get('/sss',function (req,res) {
	// console.log(req.session.user);
	if (!req.session.user) {
		// session_id
		// 直接通过session对象的属性进行设置
		req.session.user = {username: 'zs'};
	}
	res.send('1234');
});
server.get('/s',function (req,res) {
	console.log(req.session.user);
	// res.send('123');
	res.redirect('/sss');
});