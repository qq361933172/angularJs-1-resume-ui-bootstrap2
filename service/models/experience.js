//工作经验
var mongoose = require("../mongo/mongo").mongoose;
var experienceSchema = mongoose.Schema({
    userid: String,
    startTime: String,//开始时间
    endTime: String,//结束时间
    corporateName: String,//公司名称
    jobTitle: String,//职位名称
    salary: String,//月薪
    jobContent: String//工作内容
});
experienceSchema.methods.data = function () {
    return this;
}
experienceSchema.statics.finddata = function (obj, callback) {
    return this.find(obj, callback);
}
var experienceModel = mongoose.model("experence", experienceSchema);
module.exports.experienceModel = experienceModel;