module.exports.improveExperience = function ($scope, resumeValue, $http, $cookies, $route, resumeConstant) {
    $scope.user = {};
    //$scope.index = !!cookieResume.experience ? !!cookieResume.experience.index : 0;
    $scope.startDt = null;
    $scope.endDt = null;
    $scope.user.startTime = $scope.startDt;
    $scope.user.endTime = $scope.endDt;
    $scope.$on("date", function (event, value) {
        var name = event.targetScope.datePickerName;
        if (name == "startTime") {
            $scope.user.startTime = value;
        } else if (name == "endTime") {
            $scope.user.endTime = value;
        }
        // console.log($scope.user);
    });
    $scope.improveExperienceTitle = resumeValue.msg.improveExperienceTitle;
    $scope.goback = resumeConstant.url.improveInfo;
    $scope.ctrlStartTime = "startTime";
    $scope.ctrlEndTime = "endTime";
    //公司名称
    $scope.user.corporateName = "test";
    //职位
    $scope.user.jobTitle = "test";
    //月薪
    $scope.user.salary = "1000";
    //工作内容
    $scope.user.jobContent = "test";
    function saveExperience(callback) {
        var resume = $cookies.getObject("resume");
        resume.experience = $scope.user;
        //要转成字符串,不然时间会不一样
        resume.experience.startTime = resume.experience.startTime.toString();
        resume.experience.endTime = resume.experience.endTime.toString();
        //console.log("发出 : ", resume);
        $http.post(resumeConstant.service.improveExperience, resume)
            .then(function (res) {
                if (res.data.code == 1) {
                    //console.log("接收 : ", res.data);
                    if (typeof callback == "function") {
                        callback()
                    }
                }
            }, function (error) {
                console.log(error);
                alert(error.status);
            });
    }

    //提交表单
    $scope.myformsubmit = function () {
        return false;
    }
    //保存并添加
    $scope.saveResume = function () {
        saveExperience()
    }
    //保存并预览
    $scope.previewResume = function () {
        saveExperience(function () {
            var cookiesResume = $cookies.getObject("resume");
            //console.log(cookiesResume);
            var userid = {userid: cookiesResume.userInfo._id};
            $http.post(resumeConstant.service.previewResume, userid)
                .then(function (res) {
                    if (res.data.code == 1) {
                        delete res.data.code;
                        sessionStorage.setItem("resume", JSON.stringify(res.data));
                        //console.log("save : ", JSON.parse(sessionStorage.getItem("resume")));
                        cookiesResume.location = resumeConstant.url.previewResume;
                        $cookies.putObject("resume", cookiesResume);
                        $route.reload()
                    }
                }, function (error) {
                    alert(error.status);
                })
        })
    }
}
