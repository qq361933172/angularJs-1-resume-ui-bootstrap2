module.exports.improveEducation = function ($scope, resumeValue, resumeConstant, $http, $cookies) {
    $scope.goback = resumeConstant.url.improveInfo;//返回上一步
    $scope.improveEducationTitle = resumeValue.msg.improveEducationTitle;
    $scope.user = {}
    $scope.startDt = null;
    $scope.endDt = null;
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
    $scope.user.school = "某某大学";
    $scope.user.specialty = "某某专业";
    $scope.user.degree = {
        options: ["无", "大专", "本科", "研究生", "博士"],
        selected: "无"
    };
    var resumeCookies = $cookies.getObject("resume");
    $scope.educationList = [];
    //console.log(resumeCookies);
    //$http.post(resumeConstant.service.educationList,)
    $scope.myformsubmit = function () {
        $scope.user.qualifications = $scope.user.degree.selected;
        //  console.log($scope.user);
        $http.post(resumeConstant.service.improveEducation, Object.assign($scope.user, {
                userid: $cookies.getObject("resume").userInfo.userid
            }))
            .then(function (res) {
                //console.log(res.data);
                if (res.data.code == 1) {
                    var educationData = res.data;
                    delete educationData.code;
                    $scope.educationList = educationData.educationArr;
                    console.log($scope.educationList);
                }
            }, function (error) {
                if (error) {
                    alert(error.status);
                }
            })
    }
    
    
    
}