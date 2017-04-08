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
        //console.log("fillInBaseInfo : ", "save");
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
//预览教育经历
router.post('/createResume/previewEducation', function (req, res) {
    var educationModel = require("../models/education").educationModel;
    var userid = req.body.userid;
    educationModel.finddata({userid: userid}, function (error) {
        if (error)console.log('previewEducation error', error);
    }).then(function (result) {
        if (!!result.length) {//存在历史教育经历记录
            result = result.map(function (item, i) {
                item = item._doc;//todo: 结果集对象,记得要把_doc转掉
                item.educationid = item._id;
                deleteItems(item);
                return item;
            });
            res.send(Object.assign({code: 1}, result));
        } else {//不存在
            res.send({code: 0});
        }
    })
});
//todo : 删除教育经历
router.post("/createResume/deleteEducation", function (req, res) {
    //res.send(req.body);
    var educationModel = require("../models/education").educationModel;
    var userid = req.body.userid;
    var educationid = req.body.educationid;
    educationModel.remove({userid: userid, _id: educationid}, function (error) {
        if (error)console.log("deleteEducation error : ", error);
    }).then(function (result) {
        res.send({code: 1});
    });
});
//完善教育经历
router.post("/createResume/improveEducation", function (req, res) {
    //console.log(req.body);
    var educationModel = require("../models/education").educationModel;
    var educationData = req.body;
    var educationid = req.body.educationid;
    var userid = req.body.userid;
    var educationInstance = new educationModel(educationData);
    if (!!educationid) {//更新教育经历
        //console.log(req.body);
        delete req.body.userid;
        delete req.body.educationid;
        console.log(req.body);
        var promise1 = educationModel.update({
            _id: educationid,
            userid: userid
        }, {
            $set: req.body
        }, function (error) {
            if (error)console.log("update education error : ", error);
        });
        var promise2 = educationModel.finddata({_id: educationid, userid: userid}, function (error) {
            if (error)console.log("education finddata error : ", error);
        });
        q.all([promise1, promise2]).then(function (val) {
            console.log(val);
            res.send("success");
        });
    } else {//插入一条新数据并保存
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
});
//todo : 预览个人工作经验
//todo:做到这里,experience表中没有userid字段
router.post("/createResume/previewExperience", function (req, res) {
    var experienceModel = require("../models/experience").experienceModel;
    var userid = req.body.userid;
    experienceModel.finddata({userid: userid}, function (error) {
        if (error)console.log("preview experience error : ", error);
    }).then(function (resule) {
        console.log(result);
        res.send("success");
    });
});
//进一步完善个人工作经验
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
