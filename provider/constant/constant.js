var serviceSite = "http://www.will.com:3000/";
module.exports.resumeConstant = {
    //跳转地址
    url: {
        //填写基本资料
        fillInBaseInfo: "/fillInBaseInfo",
        //完善个人信息
        improveInfo: "/improveInfo",
        //教育经历
        improveEducation: "/improveEducation",
        //工作经历
        improveExperience: "/improveExperience",
        //预览简历
        previewResume: "/previewResume"
    },
    controller: {
        fillInBaseInfo: "fillInBaseInfo",
        improveInfo: "improveInfo",
        improveEducation: "improveEducation",
        improveExperience: "improveExperience",
        previewResume: "previewResume"
    },
    tpl: {
        fillInBaseInfo: "./controller/fillInBaseInfo/fillInBaseInfo.html",
        improveInfo: "./controller/improveInfo/improveInfo.html",
        improveEducation: "./controller/improveEducation/improveEducation.html",
        improveExperience: "./controller/improveExperience/improveExperience.html",
        previewResume: "./controller/previewResume/previewResume.html"
    },
    service: {
        fillInBaseInfo: serviceSite + "resume/createResume/fillInBaseInfo",
        improveInfo: serviceSite + "resume/createResume/improveInfo",
        improveEducation: serviceSite + "resume/createResume/improveEducation",
        improveExperience: serviceSite + "resume/createResume/improveExperience",
        previewResume: serviceSite + "resume/previewResume"
    },
    //高德api
    gaodeApi: {
        //密钥
        key: "8c63a48f573ab1cd447ea7aa0518b7b6",
        url: "http://restapi.amap.com/v3/config/district"
    },
    //月薪
    salary: [
        "1000~3000",
        "4000~7000",
        "8000~11000",
        "12000~15000",
        "16000~20000",
        "21000~24000",
        "25000以上"
    ],
    //目前状况
    currentStatus: [
        "在职,正考虑换",
        "在职,不考虑换",
        "已离职,1周内能到岗"
    ],
    endata: [
        {
            select: false,
            val: "不懂|",
            level: "1",
        }, {
            select: false,
            val: "很差|",
            level: "2"
        }, {
            select: true,
            val: "一般|",
            level: "3"
        }, {
            select: false,
            val: "熟练|",
            level: "4"
        }, {
            select: false,
            val: "教授级",
            level: "5"
        }
    ]
}



