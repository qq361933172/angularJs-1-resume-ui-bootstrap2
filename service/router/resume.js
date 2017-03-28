var q = require("q");
var express = require('express');
var app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var router = express.Router();
//删除_id和__v;
function deleteItems(obj) {
    if ("_id" in obj) {
        delete obj._id;
    }
    if ("__v" in obj) {
        delete obj.__v;
    }
    return obj;
}
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
//todo:如果有userid传过来,则为更新操作,反之,则为插入一行新数据
router.post('/createResume/fillInBaseInfo', function (req, res) {
    var userModel = require("../models/user").userModel;
    var userid = req.body.userid;
    if (!!userid) {
        console.log("fillInBaseInfo : ", "update");
        //存在userid则更新userinfo(users表)
        var promise1 = userModel.update({_id: userid}, {$set: req.body}, function (error) {
        });
        var promise2 = userModel.finddata({_id: userid}, function () {
        });
        q.all([promise1, promise2]).then(function (val) {
            var resUser = val[1][0]._doc;
            deleteItems(resUser);
            res.send(Object.assign({code: 1}, resUser));
        });
    }
    else {
        console.log("fillInBaseInfo : ", "save");
        //不存在userid,则存储userinfo(users表)
        var userInstance = new userModel(req.body);
        userInstance.save(function (error, user) {
            if (error)console.log('error', error);
        }).then(function () {
            var resUser = userInstance._doc;
            resUser.userid = resUser._id;
            deleteItems(resUser);
            res.send(Object.assign({}, {code: 1}, resUser));
        })
    }
});
//进一步完善个人信息
router.post('/createResume/improveInfo', function (req, res) {
    var userModel = require("../models/user").userModel;
    var userid = req.body.userInfo.userid;
    var userdata = req.body.userInfo;
    //更新数据
    var promise1 = userModel.update({_id: userid}, {$set: userdata}, function () {
    });
    //查询数据,并返回数据到客户端
    var promise2 = userModel.finddata({_id: userid}, function () {
    });
    q.all([promise1, promise2]).then(function (val) {
        var resUser = val[1][0]._doc;
        deleteItems(resUser);
        //console.log(resUser);
        res.send(Object.assign({}, {code: 1}, resUser));
    });
});
//完善教育经历
router.post("/createResume/improveEducation", function (req, res) {
    //console.log(req.body);
    var educationModel = require("../models/education").educationModel;
    var educationData = req.body;
    var educationid = req.body.educationid;
    var userid = req.body.userid;
    if (!!educationid) {//更新数据
    } else {//插入一条新数据并保存
        var educationInstance = new educationModel(educationData);
        var promise1 = educationInstance.save(function (error) {
            if (error)console.log("education save error : ", error);
        });
        var promise2 = educationModel.finddata({userid: userid}, function (error) {
            if (error)console.log("educationModel.finddata error : ", error);
        });
        q.all([promise1, promise2]).then(function (val) {
            var resEducation = val[1];
            //N个教育经历
            resEducation = resEducation.map(function (item, i) {
                item = item._doc;
                item.educationid = item._id;
                deleteItems(item);
                return item;
            });
            res.send(Object.assign({}, {code: 1}, {educationArr: resEducation}));
        });
    }
    
    return;
    console.log(req.body);
    if (req.body.action == "save") {//插入一条新的教育经历
    }
    else if (req.body.action == "update") {//更新教育经历
    }
    res.send("success")
    return;
    var educationModel = require("../models/education").educationModel;
    var education = req.body;
    delete education.degree;
    //console.log(education);
    //console.log(req.body);
    //console.log(req.body._id);
    //return;
    var userid = {userid: req.body._id}
    delete education._id;//删掉,不然会报e1100错误,重复的_id
    //console.log(userid);
    var saveData = Object.assign({}, education, userid);
    //存储
    //console.log("saveData : ", saveData);
    var newEducation = new educationModel(saveData);
    var promise1 = newEducation.save(function (error, education) {
        if (error) {
            return console.log('error', error);
        }
    });
    //console.log(userid);
    var promise2 = educationModel.finddata(userid, function (error, result) {
        if (error) {
            return console.log('error', error);
        }
    });
    q.all([promise1, promise2]).then(function (val) {
        res.send([{code: 1}, education, val[1]]);
    });
});
//获取教育经历列表
router.post("/createResume/educationList", function (req, res) {
    var educationModel = require("../models/education");
    var userid = req.body.userid;
    res.send(userid);
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
    var newExperience = new experienceModel(savedata);
    newExperience.save(function (error, experience) {
        if (error) {
            return console.log('error', error);
        }
    }).then(function () {
        //console.log(newUser._doc);
        // console.log(newExperience._doc);
        var userdata = Object.assign({}, newExperience._doc, {code: 1});
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
