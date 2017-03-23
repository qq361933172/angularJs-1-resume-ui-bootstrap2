module.exports.resumeProvider = function () {
    this.$get = function ($cookies) {
        if (!!!$cookies.getObject("resume")) {
            var resume = {
                //用户信息
                userInfo: {
                    __v: "",
                    _id: "",
                    userid: '',
                    username: '',
                    phone: '',
                    gender: '',//性别
                    dt: '',//生日
                    residence: '',//居住地
                    salary: '',//期望月薪
                    currentStatus: '',//目前状态
                    email: '',
                    qq: '',
                    englishLevel: ""
                },
                //跳转地址
                location: "",
                //教育状况
                education: {
                    startTime: "",
                    endTime: "",
                    school: "",
                    //学历
                    qualifications: "",
                    //专业
                    specialty: ""
                },
                //工作经验
                experience: {
                    //第几个工作经验
                    // index: 0,
                    //开始时间
                    startTime: "",
                    //结束时间
                    endTime: "",
                    //公司名称
                    corporateName: "",
                    //职位名称
                    jobTitle: "",
                    //月薪
                    salary: "",
                    //工作内容
                    jobContent: ""
                }
            }
            $cookies.putObject("resume", resume);
            //console.log($cookies.getObject("resume"));
        }
        var cookieResume = $cookies.getObject("resume");
        return {
            cookieResume: cookieResume
        }
    }
}