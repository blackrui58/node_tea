var express = require('express');

var server = express();
server.listen(8080);

server.get('/admin',function (req,res,next) {
	var {a} = req.query;
	if (a == 10) {
		res.send('123');
	} else {
		next();
	}
	
	// next();
});

server.get('/admin',function (req,res,next) {
	res.send('222');
});
