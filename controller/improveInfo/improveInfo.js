module.exports.improveInfo = function ($scope, resumeValue, $http, $cookies, $route, resumeConstant) {
    $scope.improveInfoTitle = resumeValue.msg.improveInfoTitle;
    $scope.goback = resumeConstant.url.fillInBaseInfo;
    var cookieResume = $cookies.getObject("resume");
    $scope.user = {};
    //居住地:
    $scope.user.residence = null;
    //双向绑定,值由子组件传过来
    $scope.s1 = null;
    $scope.s2 = null;
    $scope.s3 = null;
    $scope.$watch("s1", function (newvalue, oldvalue) {
        $scope.user.s1 = newvalue;
    }, true);
    $scope.$watch("s2", function (newvalue, oldvalue) {
        $scope.user.s2 = newvalue;
    }, true);
    $scope.$watch("s3", function (newvalue, oldvalue) {
        $scope.user.s3 = newvalue;
    }, true);
    //期望薪资
    $scope.user = {};
    $scope.user.salary = {
        options: resumeConstant.salary,
        selected: !!cookieResume.userInfo.salary ? cookieResume.userInfo.salary : resumeConstant.salary[0]
    }
    //目前状况
    $scope.user.currentStatus = {
        options: resumeConstant.currentStatus,
        selected: !!cookieResume.userInfo.currentStatus ? cookieResume.userInfo.currentStatus : resumeConstant.currentStatus[0]
    }
    //提交表单:
    $scope.myformsubmit = function () {
        if (!$scope.myform.$valid) {
            return false;
        }
        //获取第一步已经存储cookie中的userInfo
        var resume = $cookies.getObject("resume");
        //拿$scope中的键值填入userInfo中
        Object.keys($scope.user).forEach(function (item, i) {
            resume["userInfo"][item] = $scope.user[item]['selected'];
        });
        resume.userInfo.residence = $scope.user.s1.selected + "," + $scope.user.s2.selected + "," + $scope.user.s3.selected;
        resume.userInfo.dt = resume.userInfo.dt.toString();
        $http.post(resumeConstant.service.improveInfo, resume)
            .then(function (res) {
                if (res.data.code == 1) {
                    //console.log(res.data);
                    delete res.data.code;
                    //console.log(res.data);
                    //存入用户信息和下一步跳转路径
                    $cookies.putObject("resume", {
                        userInfo: res.data,
                        location: resumeConstant.url.improveEducation
                    });
                    //console.log(res.data);
                    //console.log($cookies.getObject("resume"));
                    $route.reload();
                    //$location.path("/createResumeStep2");
                }
            }, function (error) {
                console.log(error);
                alert(error.status);
            });
    }
}
