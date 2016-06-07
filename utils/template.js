// template render util
'use strict';
// 规则为格式化＋校验码
var Handlebars = require('handlebars');

var SYSTemplate = require('../models/sys').SYSTemplate;

var __all__ = {};
__all__.compile = function* (code) {
    try {
        if (!code) {
            throw Error("模版代码不能为空");
        };
        var t = yield SYSTemplate.get(code).run();
        return Handlebars.compile(t.content);
    } catch (e) {
        throw e;
    }
};
__all__.render = function* (code, data) {
    try {
        if (!code || !data) {
            throw Error("template code and data should both provided");
        };
        var t = yield SYSTemplate.get(code).run();
        var temp = Handlebars.compile(t.content);
        return temp(data);
    } catch (e) {
        throw e;
    }
}
module.exports = __all__;
