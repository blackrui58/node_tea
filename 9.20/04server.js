var http = require('http');
var fs = require('fs');

//创建服务
var server = http.createServer(function (req,res) {
	console.log(req.url);
	// /a.html
	// /b.html
		// 读取文件
	//'www'+req.url
	// 反单引号
	fs.readFile(`www${req.url}`,function (err,data) {
		if (err) {
			res.write('404');
		} else {
			res.write(data.toString());
		}
		res.end();
	});


});

// 监听端口
server.listen(8080);