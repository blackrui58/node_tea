// 获取fs模块
var fs = require('fs');

//写文件
// 目标文件
// 内容
// 回调函数
// fs.writeFile('./1.txt','aaabbcc',function (err) {
// 	if (err) {
// 		console.log('写入失败');
// 	} else {
// 		console.log('写入成功');
// 	}
// });

// 目标文件
// 回调函数 (err,data)
fs.readFile('./a.html',function (err,data) {
	if (err) {
		console.log('读取失败');
	} else {
		console.log(data.toString());
	}
});