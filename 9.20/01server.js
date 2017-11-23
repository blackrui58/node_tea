// 获取http模块
var http = require('http');

// 通过http模块创建服务
// request: 请求  (前台)
// response: 响应 (后台)
var server = http.createServer(function (req,res) {
	// console.log('有人来了1111');

	console.log(req.url);

	if (req.url == '/in_theaters') {
		res.write('{"a": 1,"b": 2}');
	}

	if (req.url == '/a.html') {
		res.write('<!DOCTYPE html>\
<html lang="en">\
<head>\
	<meta charset="UTF-8">\
	<title></title>\
</head>\
<body>\
	<h1>这是a文件</h1>\
</body>\
</html>');
	}
	// 给前台响应数据
	// res.write('1234');
	// 结束响应
	res.end();
});

// 服务的端口
// 监听端口 (最好是不被占用的端口)
server.listen(8080);