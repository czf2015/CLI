function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
}

function format(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
    var o = {
        "M+": new Date(time).getMonth() + 1,                 //月份 
        "d+": new Date(time).getDate(),                    //日 
        "h+": new Date(time).getHours(),                   //小时 
        "m+": new Date(time).getMinutes(),                 //分 
        "s+": new Date(time).getSeconds(),                 //秒 
        "q+": Math.floor((new Date(time).getMonth() + 3) / 3), //季度 
        "S": new Date(time).getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (new Date(time).getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// console.log(format(Date.now()))

module.exports = {
    isDate,
    format,
}