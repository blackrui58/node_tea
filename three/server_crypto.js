function md5 (str) {
	// 加密
	var crypto = require('crypto');

	// 设置加密方式
	var obj = crypto.createHash('md5');

	// 加密的内容
	obj.update(str);

	// 加密后的值
	return obj.digest('hex');
}
exports.md5 = md5;