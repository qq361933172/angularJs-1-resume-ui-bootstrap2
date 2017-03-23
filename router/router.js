module.exports.router = function ($routeProvider, resumeConstant) {
    $routeProvider
        .when(
            //填写基本信息
            resumeConstant.url.fillInBaseInfo,
            {
                templateUrl: resumeConstant.tpl.fillInBaseInfo,
                controller: resumeConstant.controller.fillInBaseInfo
            }
        )
        .when(
            //完善个人信息
            resumeConstant.url.improveInfo,
            {
                templateUrl: resumeConstant.tpl.improveInfo,
                controller: resumeConstant.controller.improveInfo
            }
        )
        //完善教育经历
        .when(
            resumeConstant.url.improveEducation,
            {
                templateUrl: resumeConstant.tpl.improveEducation,
                controller: resumeConstant.controller.improveEducation
            }
        )
        .when(
            //完善工作经验
            resumeConstant.url.improveExperience,
            {
                templateUrl: resumeConstant.tpl.improveExperience,
                controller: resumeConstant.controller.improveExperience
            }
        )
        .when(
            //预览简历
            resumeConstant.url.previewResume,
            {
                templateUrl: resumeConstant.tpl.previewResume,
                controller: resumeConstant.controller.previewResume
            }
        )
        .otherwise({
            redirectTo: resumeConstant.url.fillInBaseInfo
        })
}