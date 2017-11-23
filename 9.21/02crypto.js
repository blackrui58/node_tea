var crypto = require('crypto');

// 指定加密方式
var obj = crypto.createHash('md5');

// 加密操作
obj.update('123456');

// 加密结果 (32位)
console.log(obj.digest('hex'));