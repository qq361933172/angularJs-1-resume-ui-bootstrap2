module.exports.filters = {
    educationListFilter: function () {
        return function (input, attribute) {
            if (input.length < 1) {
                //console.log("input.length < 1 : ", input);//因为需要处理的对象是一个请求回来的数据,没请求之前是一个空数组,所以,当为空数组的时候,不做任何处理,直接返回
                return input;
            }
            //console.log("input.length >= 1 : ", input);
            var arr = [];//声明一个存储器,存储处理后的数组
            for (i in input) {//由于使用了track by 原来的数组便成了key为数字的对象
                arr.push(input[i]);//把对象遍历后扔进存储器
            }
            arr = arr.sort(function (a, b) {
                if (attribute == 'up') {//判断输入过滤器的条件,如果是up则升序
                    return Date.parse(a.startTime) - Date.parse(b.startTime);
                } else {//如果是down,则降序
                    //这里是为了处理日期转时间戳的时候,返回nan的问题
                    var aa = !!isNaN(Date.parse(a.startTime)) ? 0 : Date.parse(a.startTime);
                    var bb = !!isNaN(Date.parse(b.startTime)) ? 0 : Date.parse(b.startTime);
                    return bb - aa;
                }
            });
            return arr;
        }
    }
}