// 计算星座
module.exports.getAstro = function(month, day) {
    var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr = [20, 19, 21, 20, 21, 22, 23, 23, 24, 23, 22, 20];
    return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}

// 计算属相－根据传统历法，以立春为时间分界线
module.exports.getZodiac = function(year, month, day) {
    var s = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var offset = 8;
    var pos = (year + offset) % 12;
    // 根据具体日期进行微调
    if (month == 1 || (month == 2 && day < 4)) {
        pos = pos - 1;
    }
    if (pos < 0) {
        pos = 11;
    }
    return s[pos];
}
