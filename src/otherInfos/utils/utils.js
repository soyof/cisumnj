/*
 * @Author: shihm30235
 * @Date: 2020-07-14 16:47:41
 * @LastEditTime: 2020-12-24 10:01:33
 */

export function checkObjFieldIsNull(obj) {
    return Object.keys(obj).every(key => {
        return !obj[key] && obj[key] !== 0;
    });
}

/**
 *
 * @param {r} 时间戳
 * @param {a} 转换之后的时间格式
 * @param {t} true||false,false:补零；true:不补零
 * 使用方法：
 * let t = new Date().getTime();
 * format(t, 'Y年 h:m:s');
 */
let e = function(e, r) {
    return (!r && 10 > e ? "0" : "") + e;
};
export function format(r, a, t) {
    a = a || "Y-M-D h:m:s";
    for (
        var c = r.getTime ? r : new Date(r), s = a.length, g = a, n = 0; s > n; n++
    ) {
        switch (a.charAt(n)) {
            case "Y":
                g = g.replace(/Y/g, e(c.getFullYear(), t));
                break;
            case "y":
                g = g.replace(/y/g, e(c.getFullYear(), t).substring(2));
                break;
            case "M":
                g = g.replace(/M/g, e(c.getMonth() + 1, t));
                break;
            case "D":
                g = g.replace(/D/g, e(c.getDate(), t));
                break;
            case "h":
                g = g.replace(/h/g, e(c.getHours(), t));
                break;
            case "m":
                g = g.replace(/m/g, e(c.getMinutes(), t));
                break;
            case "s":
                g = g.replace(/s/g, e(c.getSeconds(), t));
        }
    }
    return g;
}

export function deepClone(source) {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "shallowClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === "object") {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
/**
 * "20160728"---> "2016/07/28"
 * @param {date} 时间
 */
export function formatDate(date) {
    var f = date == undefined || date == null ? "" : date.toString();
    return f ? f.substr(0, 4) + "-" + f.substr(4, 2) + "-" + f.substr(6, 2) : "";
}
/**
 * //"20160728102000"--->"2016/07/28 10:20:00"
 * @param {date} 时间
 */
export function formatTime(date) {
    var f = date == undefined || date == null ? "" : date.toString();
    return f ?
        f.substr(0, 4) +
        "-" +
        f.substr(4, 2) +
        "-" +
        f.substr(6, 2) +
        " " +
        f.substr(8, 2) +
        ":" +
        f.substr(10, 2) +
        ":" +
        f.substr(12, 2) :
        "";
}
/**
 * "2016/07/28" ---> "20160728"
 * @param {date} 时间
 */
export function dateToNumber(date) {
    return date ? date.replace(new RegExp("-", "g"), "") : "";
}
/**
 * //"2016/07/28 10:20:00"--->"20160728102000"
 * @param {date} 时间
 */
export function timeToNumber(date) {
    return date ?
        date.substring(0, 10).replace(new RegExp("-", "g"), "") +
        date.substring(11).replace(new RegExp("T|:", "g"), "") :
        "";
}
// 获取当天推上个月的日期
export function getPreMonth(date) {
    var cuurentDate = date ? new Date(date) : new Date();
    var year = cuurentDate.getFullYear(); //获取当前日期的年份
    var month = cuurentDate.getMonth() + 1; //获取当前日期的月份
    var day = cuurentDate.getDate(); //获取当前日期的日
    var days = new Date(year, month, 0).getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = month - 1;
    if (month2 == 0) {
        year2 = year2 - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = "0" + month2;
    }
    if (day2 < 10) {
        day2 = "0" + day2;
    }
    var t2 = year2 + "/" + month2 + "/" + day2;
    return t2;
}