//css
require("./node_modules/bootstrap/dist/css/bootstrap.css");
require("./static/css/red/style.less");
//angular
require("angular");
require("angular-route");
require("angular-ui-bootstrap");
require("angular-cookies");
//国际化插件
require("angular-translate");
//myjs
var myutil = require("./static/js/myutil").myutil;
//myutil.clearAllCokies();
//directive
require("./directive/goBackBtn/go-back-btn.html");
var goBackBtn = require("./directive/goBackBtn/goBackBtn").goBackBtn;
require("./directive/datePicker/datePicker.html");
var datePicker = require("./directive/datePicker/datePicker").datePicker;
require("./directive/areaSelect/area-select.html");
var areaSelect = require("./directive/areaSelect/areaSelect").areaSelect;
require("./directive/title/title.html");
var createResumeTitle = require("./directive/title/title.js").title;
//run
var run = require("./run/run").run;
//provider
var resumeProvider = require("./provider/provider/provider").resumeProvider;
var resumeConstant = require("./provider/constant/constant").resumeConstant;
var resumeValue = require("./provider/value/value").resumeValue;
var resumeService = require("./provider/service/service").resumeService;
var resumeFactory = require("./provider/factory/factory").resumeFactory;
//填写基本资料
require("./controller/fillInBaseInfo/fillInBaseInfo.html");
var fillInBaseInfo = require("./controller/fillInBaseInfo/fillInBaseInfo.js").fillInBaseInfo;
//完善个人信息
require("./controller/improveInfo/improveInfo.html");
var improveInfo = require("./controller/improveInfo/improveInfo").improveInfo;
//工作经历
require("./controller/improveExperience/improveExperience.html");
var improveExperience = require("./controller/improveExperience/improveExperience").improveExperience;
//教育经历
require("./controller/improveEducation/improveEducation.html");
var improveEducation = require("./controller/improveEducation/improveEducation").improveEducation;
//预览简历
require("./controller/previewResume/previewResume.html");
var previewResume = require("./controller/previewResume/previewResume.js").previewResume;
//app
var app = angular.module("resume", [
    "ngRoute",
    "ui.bootstrap",
    "ngCookies",
    "pascalprecht.translate"
]);
//run,初始化
app.run(run);
//router
var router = require("./router/router").router;
//国际化引入
var translate = require("./translate/translate").translate;
//route
app.config(router);
app.config(translate);
//value
app.value("resumeValue", resumeValue);
//factory
app.factory("resumeFactory", resumeFactory);
//service
app.service("resumeService", resumeService);
//provider
app.provider("resumeProvider", resumeProvider);
//constant
app.constant("resumeConstant", resumeConstant);
//directive
app.directive("goBackBtn", goBackBtn);
app.directive("datePicker", datePicker);
app.directive("areaSelect", areaSelect);
app.directive("createResumeTitle", createResumeTitle);
//controller
app.controller("fillInBaseInfo", fillInBaseInfo);
app.controller("improveInfo", improveInfo);
app.controller("improveEducation", improveEducation);
app.controller("improveExperience", improveExperience);
app.controller("previewResume", previewResume);
//filter
app.filter("educationListFilter", require("./filters/filters").filters.educationListFilter);



