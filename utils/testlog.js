// 自定义的logger工具
'use strict';
var util = require('util');
var config = require('../config');
var TestLog = require('../models/test_log').TestLog;
var test_log = config.test_log;

var _ = require('lodash');

module.exports = function * (mark, msg) {
	if(test_log){
		var log = {
	        mark: mark
	    };
	    if (util.isString(msg)) {
	        log.msg = msg;
	    } else if (util.isBuffer(msg)) {
	        var out = msg.toJSON();
	        out.content = msg.toString();
	        log.msg = util.inspect(out, {
	            depth: null
	        });
	    } else if (util.isError(msg)) {
	        log.msg = {
	            name: msg.name,
	            message: msg.message,
	            stack: msg.stack
	        };
	    } else if (util.isObject(msg) || util.isArray(msg)) {
	        log.msg = util.inspect(msg, {
	            depth: null
	        });
	    } else { // 其他类型直接转string输出
	        log.msg = msg;
	    };
	    log.insert_time = Date.now();
	    return yield TestLog.insert(log).run();
	}else{
		return {errors:"日志传送已关闭"};
	}
}