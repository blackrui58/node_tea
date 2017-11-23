var http = require('http');
var fs = require('fs');

//创建服务
var server = http.createServer(function (req,res) {

	if (req.url == '/in_theaters') {
		res.write('{"a": 1,"b": 2}');
		res.end();
	} else {
		//'www'+req.url
		// 反单引号
		// 服务器的文件
		// www/in_theaters
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