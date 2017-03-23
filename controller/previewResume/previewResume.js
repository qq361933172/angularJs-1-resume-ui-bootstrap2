var jq = require("jquery").noConflict();
module.exports.previewResume = function ($scope) {
    var resume = JSON.parse(sessionStorage.getItem("resume"));
    //type : Object
    var userInfo = resume.resume[0][0];
    //type : array,工作经验可以为多个,数组形式存在
    var experience = resume.resume[1];
    $scope.u = userInfo;
    $scope.e = experience;
    
    
    
    var callback = function () {
        jq('.item-skills').each(function () {
            newWidth = jq(this).parent().width() * jq(this).data('percent');
            jq(this).width(0);
            jq(this).animate({
                width: newWidth,
            }, 1000);
        });
        jq('.icons-red').each(function () {
            height = jq(this).height();
            jq(this).animate({
                height: 14,
            }, 2000);
        });
    };
    jq(document).ready(callback);
    var resize;
    window.onresize = function () {
        console.log(jq('.item-skills'));
        clearTimeout(resize);
        resize = setTimeout(function () {
            callback();
        }, 100);
    };
}