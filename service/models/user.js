//基本信息
var mongoose = require('../mongo/mongo').mongoose;
var userSchema = mongoose.Schema({
    userid: String,
    username: String,
    phone: String,
    gender: String,//性别
    dt: String,//生日
    residence: String,//居住地
    salary: String,//期望月薪
    currentStatus: String,//目前状态
    email: String,
    qq: String,
    englishLevel: String
});
userSchema.methods.data = function () {
    return this;
};
//注意userSchema.statics.finddata ,不能定义成userSchema.statics.find或者findone
userSchema.statics.finddata = function (obj, callback) {
    return this.find(obj, callback);
}
var userModel = mongoose.model('user', userSchema);
module.exports.userModel = userModel;