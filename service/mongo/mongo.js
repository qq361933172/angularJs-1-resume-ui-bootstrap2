//连接数据库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;//这句要加，否则会报错
mongoose.connect('mongodb://localhost:27017/resume');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', function (callback) {
    console.log('mongodb connection success');
});
module.exports.mongoose = mongoose;