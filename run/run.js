module.exports.run = function ($rootScope, $location, $cookies, resumeConstant, resumeProvider, $window) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var resume = $cookies.getObject("resume");
        if (!!resume && !!resume.location) {
            $location.path(resume.location);
        } else {
            $location.path(resumeConstant.url.fillInBaseInfo);
        }
    });
}