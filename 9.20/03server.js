var http = require('http');
var fs = require('fs');

//创建服务
var server = http.createServer(function (req,res) {

	if (req.url == '/a.html') {
		// 读取文件
		fs.readFile('www/a.html',function (err,data) {
			if (err) {
				res.write('404');
			} else {
				res.write(data.toString());
			}
			res.end();
		});
	}

});

// 监听端口
server.listen(8080);