module.exports.goBackBtn = function () {
    return {
        scope: {
            back: "="
        },
        restrict: "AE",
        templateUrl: "./directive/goBackBtn/go-back-btn.html",
        controller: function ($scope, $route, $cookies, resumeConstant) {
            $scope.goback = function () {
                var resume = $cookies.getObject("resume");
                resume.location = $scope.back;
                //console.log("goback : ", $scope.back);
                $cookies.putObject("resume", resume);
                //console.log($cookies.getObject("resume"));
                $route.reload();
            }
        },
        link: function (scope, element, attrs, ParentCtrl) {
        }
    }
}