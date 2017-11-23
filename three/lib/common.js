var crypto = require('crypto');
module.exports = {
	// md5加密
	md5: function (str) {
		var obj = crypto.createHash('md5');
		obj.update(str);
		return obj.digest('hex');
	},
	// 自己封装的操作 (获取数据)
	sendData: function (db,req,res) {
			// 获取整体url
		// console.log(req.url);
		// 获取的是接口,不包括后面的参数
		// /in_theaters
		console.log(req.path);
		var path = req.path.substr(1);
		var SQL = `SELECT COUNT(*) AS c FROM ${path}`;	
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
				var SQL = `SELECT * FROM ${path} LIMIT ${(page - 1) * count},${count}`;
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


	}
};


