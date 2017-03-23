var q = require("q");
var express = require('express');
var app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var router = express.Router();
router.get('/', function (req, res) {
    //console.log(req.query);//取get参数相当于php中的$_GET
    /* res
         .cookie('test2', 'test')
         .end('success');*/
    // res.cookie('aaa', 'bbb');
    res.end('success page');
});
// router.get('/:page/:act', function (req, res) {
//     //访问路径:http://127.0.0.1:3000/angularJs-1-demo/1/dosth
//     //后台打印 : 1,dosth
//     console.log(req.params.page);
//     console.log(req.params.act);
//     res.send('success');
// });
//填写基本信息
router.post('/createResume/fillInBaseInfo', function (req, res) {
    var userModel = require("../models/user").userModel;
    var userM = new userModel(req.body);
    //todo:save
    userM.save(function (error, user) {
        if (error) {
            return console.log('error', error);
        }
    }).then(function () {
        //console.log(userM._doc);
        var userdata = Object.assign({}, userM._doc, {code: 1});
        res.send(userdata);
    });
});
//进一步完善个人信息
router.post('/createResume/improveInfo', function (req, res) {
    //console.log("req.body : ", req.body);
    var userModel = require("../models/user").userModel;
    // console.log(req.body.userInfo);
    //todo:update
    var id = {"_id": req.body.userInfo._id};
    //console.log(req.body.userInfo);
    userModel.update(id, req.body.userInfo, function (error) {
        if (error)console.log("error", error);
        //todo : find
        userModel.finddata(id, function (error, userdata) {
            if (error)console.log("error", error);
            //console.log(userdata);
            res.send(Object.assign(userdata[0]._doc, {code: 1}));
        })
    })
    ;
});
//完善教育经历
router.post("/createResume/improveEducation", function (req, res) {
    var educationModel = require("../models/education").educationModel;
    var education = req.body;
    delete education.degree;
    //console.log(education);
    var userid = {userid: req.body._id}
    //console.log(userid);
    var saveData = Object.assign({}, education, userid);
    //存储
    console.log("saveData : ", saveData);
    var educationM = new educationModel(saveData);
    educationM.save(function (error, education) {
        if (error) {
            return console.log('error', error);
        }
    }).then(function () {
        console.log("education : ", education);
    });
    res.send("success");
});
//进一步完善个人经验
router.post("/createResume/improveExperience", function (req, res) {
    var experienceModel = require("../models/experience").experienceModel;
    //userid就是userModel里的_id;
    //var userid = {"userid": req.body.userInfo._id};
    //console.log("req.body : ", req.body);
    var experience = req.body.experience;
    var userid = {userid: req.body.userInfo._id};
    var savedata = Object.assign(experience, userid);
    //console.log(savedata);
    //存储
    var experienceM = new experienceModel(savedata);
    experienceM.save(function (error, experience) {
        if (error) {
            return console.log('error', error);
        }
    }).then(function () {
        //console.log(userM._doc);
        // console.log(experienceM._doc);
        var userdata = Object.assign({}, experienceM._doc, {code: 1});
        res.send(userdata);
    });
});
//预览简历
router.post("/previewResume", function (req, res) {
    //console.log(req.body);
    var userModel = require("../models/user").userModel;
    var experienceModel = require("../models/experience").experienceModel;
    var promise1 = userModel.finddata({_id: req.body.userid}, function (error, result) {
        if (error)console.log(error);
    });
    var promise2 = experienceModel.finddata({userid: req.body.userid}, function (error, result) {
        if (error)console.log(error);
    });
    q.all([promise1, promise2])
        .then(function (val) {
            res.send({
                code: 1,
                resume: val
            })
        });
});
// router.get('/getJsonpData', function (req, res) {
//     return res.send(req.query.callback + '(' + 123 + '' + ')');//处理跨域
// });
module.exports = router;
