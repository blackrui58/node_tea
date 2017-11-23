var http = require('http');

http.createServer(function (req,res) {
	console.log(req.url);
	res.write('123');
	res.end();
}).listen(8080);