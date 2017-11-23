var http = require('http');
var fs = require('fs');

//创建服务
var server = http.createServer(function (req,res) {

	//ajax: '/in_theaters'
	// 读取接口
	if (req.url == '/in_theaters') {
		res.write('{"a":1 ,"b": 2}');
		res.end();
	} else {
		// 读取www的文件
		fs.readFile(`www${req.url}`,function (err,data) {
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