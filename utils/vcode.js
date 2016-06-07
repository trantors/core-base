'use strict';

// 生成验证码的工具

module.exports = function (len, chars) {
    len = len || 4;
    chars = chars || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var ret = [];
    for (var i = 0; i < len; i++) {
        ret.push(chars[parseInt(Math.random() * chars.length)]);
    };
    return ret.join('');
};
