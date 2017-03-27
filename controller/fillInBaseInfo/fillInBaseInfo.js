module.exports.fillInBaseInfo = function ($scope, $route, $http, resumeValue, $location, $cookies, resumeConstant, resumeService, resumeFactory) {
    $scope.ctrlDatePickerName = "birthday";
    var cookieResume = $cookies.getObject("resume");
    $scope.ctrlDt = !!cookieResume.userInfo.dt ? new Date(cookieResume.userInfo.dt) : new Date();
    $scope.user = {};
    $scope.user.gender = !!cookieResume.userInfo.gender ? cookieResume.userInfo.gender : "male";
    $scope.user.username = !!cookieResume.userInfo.username ? cookieResume.userInfo.username : "张三";
    $scope.user.phone = !!cookieResume.userInfo.phone ? cookieResume.userInfo.phone : "13715351488";
    $scope.user.email = !!cookieResume.userInfo.email ? cookieResume.userInfo.email : "aa@qq.com";
    $scope.user.qq = !!cookieResume.userInfo.qq ? cookieResume.userInfo.qq : "123456";
    $scope.$on("date", function (event, data) {
        var cookieResume = $cookies.getObject("resume");
        $scope.user.dt = !!cookieResume.userInfo.dt ? new Date(cookieResume.userInfo.dt) : new Date(data);
    });
    $scope.user.en = resumeConstant.endata;
    $scope.enSelect = function (index) {
        $scope.user.en.map(function (item, i) {
            item.select = false;
            if (index == i) {
                item.select = true;
                var resumeCookies = $cookies.getObject("resume");
                resumeCookies.userInfo.englishLevel = item.level;
                $cookies.putObject("resume", resumeCookies);
                //console.log($cookies.getObject("resume").userInfo.englishLevel);
            }
            return item;
        });
    }
    $scope.fillBaseInfoTitle = resumeValue.msg.fillBaseInfoTitle;
    $scope.reg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
    $scope.regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    $scope.regqq = /^\d{5,10}$/;
    $scope.submitted = false;
    $scope.myformsubmit = function () {
        if (!$scope.myform.$valid) {
            return false;
        }
        var resumeCookies = $cookies.getObject("resume");
        $scope.submitted = true;
        $scope.user.englishLevel = (function () {
            if (!!resumeCookies.userInfo.englishLevel) {
                return resumeCookies.userInfo.englishLevel;
            }
            var value = null;
            $scope.user.en.forEach(function (item, i) {
                if (item.select) {
                    value = item.level;
                }
            });
            return value;
        })();
        //console.log(resumeCookies);
        $scope.user.userid = !!resumeCookies.userInfo.userid ? resumeCookies.userInfo.userid : "";
        $http.post(resumeConstant.service.fillInBaseInfo, $scope.user)
            .then(function (res) {
                if (res.data.code == 1) {
                    delete res.data.code;
                    //console.log(res.data);
                    //存入用户信息和下一步跳转路径
                    $cookies.putObject("resume", {
                        userInfo: res.data,
                        location: resumeConstant.url.improveInfo
                    });
                    console.log(res.data);
                    //console.log($cookies.getObject("resume"));
                    //$route.reload();
                    //$location.path("/createResumeStep2");
                }
            }, function (error) {
                console.log(error);
                alert(error.status);
            });
    }
}
