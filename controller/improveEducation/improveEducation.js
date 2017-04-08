module.exports.improveEducation = function ($scope, resumeValue, resumeConstant, $http, $cookies, $location, $route, $timeout) {
    var resumeCookies = $cookies.getObject("resume");
    //新建一个cookies,存储教育经验,以方便后面点编辑的时候能够刷新页面从cookies里面获取信息填写到表单
    var resumeUpdateEducationCookies = $cookies.getObject("updateEducation");
    //判断是更新教育经历还是新建教育经历,true为更新,false为新建,当cookie中没有updateEducation,则自动设置为false
    $scope.isUpdate = !!resumeUpdateEducationCookies && !!resumeUpdateEducationCookies.isUpdate ? true : false;
    //是否转到下一步
    $scope.isNextStep = false;
    $scope.goback = resumeConstant.url.improveInfo;//返回上一步
    $scope.pageTitle = !$scope.isUpdate ? resumeValue.msg.improveEducationTitle : resumeValue.msg.updateEducationTitle;
    $scope.user = {}
    $scope.startDt = !!resumeUpdateEducationCookies ? new Date(resumeUpdateEducationCookies.startTime) : null;
    $scope.endDt = !!resumeUpdateEducationCookies ? new Date(resumeUpdateEducationCookies.endTime) : null;
    $scope.user.startTime = $scope.startDt;
    $scope.user.endTime = $scope.endDt;
    $scope.ctrlStartTime = "startTime";
    $scope.ctrlEndTime = "EndTime";
    $scope.$on("date", function (event, value) {
        var name = event.targetScope.datePickerName;
        //console.log(name);
        if (name == "startTime") {
            $scope.user.startTime = value;
        } else {
            $scope.user.endTime = value;
        }
    });
    $scope.user.school = !!resumeUpdateEducationCookies ? resumeUpdateEducationCookies.school : "";
    $scope.user.specialty = !!resumeUpdateEducationCookies ? resumeUpdateEducationCookies.specialty : "";
    $scope.user.degree = {
        options: ["无", "大专", "本科", "研究生", "博士"],
        selected: !!resumeUpdateEducationCookies ? resumeUpdateEducationCookies.qualifications : "无"
    };
    $scope.educationList = [];
    //todo : 完善教育经历,进来先请求历史填写的记录
    $http.post(resumeConstant.service.previewEducation, {
        userid: resumeCookies.userInfo.userid
    }).then(function (res) {
        if (!!res.data.code) {
            delete res.data.code;
            $scope.educationList = res.data;
        }
    });
    //删除教育经历
    $scope.deleteEducation = function (educationid) {
        $http.post(resumeConstant.service.deleteEducation, {
            userid: resumeCookies.userInfo.userid,
            educationid: educationid
        }).then(function (res) {
            if (res.data.code == 1) {
                $route.reload();
            }
        });
    }
    //修改(更新)教育经历
    $scope.updateEducation = function (v) {
        $cookies.putObject("updateEducation", {
            school: v.school,
            specialty: v.specialty,
            qualifications: v.qualifications,
            startTime: v.startTime,
            endTime: v.endTime,
            isUpdate: 1,
            educationid: v.educationid,
            userid: v.userid
        });
        $route.reload();
    }
    $scope.saveAndAdd = function () {
        $scope.isNextStep = false;
    }
    $scope.nextStep = function () {
        $scope.isNextStep = true;
    }
    //console.log(resumeCookies);
    //$http.post(resumeConstant.service.educationList,)
    $scope.myformsubmit = function () {

        //resumeUpdateEducationCookies
        if ($scope.isUpdate) {//修改或者更新教育经历
            var resumeUpdateEducationCookies = $cookies.getObject('updateEducation');
            console.log('$scope.user -- >', $scope.user);
            $http({
                url: resumeConstant.service.improveEducation,
                method: "post",
                data: Object.assign($scope.user, {
                    userid: resumeUpdateEducationCookies.userid,
                    educationid: resumeUpdateEducationCookies.educationid,
                    qualifications: $scope.user.degree.selected//学历
                })
            }).then(function (res) {
                if (res.data == 'success') {
                    $cookies.remove("updateEducation");
                    $route.reload();
                }
            });
        }
        else {//创建并保存新的教育经历
            //  console.log($scope.user);
            $http.post(resumeConstant.service.improveEducation, Object.assign($scope.user, {
                    userid: $cookies.getObject("resume").userInfo.userid,
                    qualifications: $scope.user.degree.selected//学历
                }))
                .then(function (res) {
                    //console.log(res.data);
                    if (res.data.code == 1) {
                        var educationData = res.data;
                        delete educationData.code;
                        $scope.educationList = educationData.educationArr;
                        //console.log($scope.educationList);
                        //console.log($cookies.getObject('resume'));
                        var resumeCookies = $cookies.getObject("resume");
                        //console.log("$scope.isNextStep --> ", $scope.isNextStep);
                        if ($scope.isNextStep) {
                            resumeCookies.location = resumeConstant.url.improveExperience;
                            $cookies.putObject("resume", resumeCookies);
                        }
                        $route.reload();
                    }
                }, function (error) {
                    if (error) {
                        alert(error.status);
                    }
                });
        }
    }
}