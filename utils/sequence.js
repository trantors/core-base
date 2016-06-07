// 自动编号生成工具
'use strict';
// 规则为格式化＋校验码
var crypto = require("crypto");
var sprintf = require("sprintf-js").sprintf;

var SYSSequence = require('../models/sys').SYSSequence;

/**
 * 自动生成编码的工具
 * 用法: 
 * ````
 * var next_code = yield getNextVal("EVENT");
 * ````
 * @param  {String} code 代码 
 */
var getNextVal = function* (code, sign_len) {
    try {
        if (typeof sign_len === 'undefined') {
            sign_len = -6
        };
        var seq = yield SYSSequence.get(code).run();
        seq.current = parseInt(seq.current) + 1;
        yield SYSSequence.get(code).update({
            current: seq.current
        }).run();
        var s = sprintf(seq.format, seq.current);
        var md5 = crypto.createHash('md5');
        md5.update(s);
        var sign = md5.digest('hex');
        return s + sign.slice(sign_len).toUpperCase();
    } catch (e) {
        throw e;
    }
};

module.exports.getNextVal = getNextVal;
