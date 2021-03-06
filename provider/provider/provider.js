module.exports.resumeProvider = function () {
    this.$get = function ($cookies) {
        //初始化的时候,调用,创建cookies,不然后面调用或者创建cookies对象里面的对象时,会报错
        if (!!!$cookies.getObject("resume")) {
            var resume = {
                //用户信息
                userInfo: {
                    userid: '',//对应mongodb中,users表里的_id
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
                    educationid: "",//对应monbodb中,education表里的_id
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
                    experienceid: "",//对应experience表中的_id
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