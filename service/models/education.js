//教育状况
var mongoose = require("../mongo/mongo").mongoose;
var educationSchema = mongoose.Schema({
    userid: String,
    startTime: String,
    endTime: String,
    school: String,
    qualifications: String,//学历
    specialty: String//专业
});
educationSchema.methods.data = function () {
    return this;
}
educationSchema.statics.finddata = function (obj, callback) {
    return this.find(obj, callback);
}
var educationModel = mongoose.model("education", educationSchema);
module.exports.educationModel = educationModel;