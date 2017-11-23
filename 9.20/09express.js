// 获取express框架
var express = require('express');

// 创建服务
var server = express();
server.listen(8080);

// 接口  function
// server.get('/in_theaters',function (req,res) {
// 	//整个url
// 	// console.log(req.url);
// 	console.log(req.query);
// 	// 可以直接发送对象
// 	res.send({a: 1,b: 2});
// 	res.end();
// })

// server.post('/s',function (req,res) {
// 	res.send('1234');
// 	res.end();
// })
// 能接受任意的请求
// server.use(function (req,res) {
// 	res.send('1234');
// 	res.end();
// })

// 静态文件
server.use(express.static('www/'));
