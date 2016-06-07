// 自定义的logger工具
'use strict';
var util = require('util');
var config = require('../config');
var colors = require('colors');
var maps = {
    '0': {
        'color': '',
        'head': '',
    },
    '1': {
        'color': 'red',
        'head': '[ERR]',
    },
    '2': {
        'color': 'yellow',
        'head': '[WARN]',
    },
    '3': {
        'color': 'green',
        'head': '[INFO]',
    },
    '4': {
        'color': 'cyan',
        'head': '[DEBUG]',
    },
};

/**
 * 控制台打印信息的小工具
 * 用法: 
 * ````
 * logger("hello", 4);
 * ````
 * @param  {Mix} msg 消息 
 * @param  {Number} level 等级
 */
module.exports = function (msg, level) {
    var log_level = config.log_level;
    if (typeof level === 'undefined') {
        var level = 4;
    };
    if (level && level <= log_level) {
        var color = colors[maps[level].color];
        process.stdout.write(color(maps[level].head));
        process.stdout.write(' - ' + new Date() + '\n');
        if (typeof msg === 'string') {
            process.stdout.write(color(msg));
        } else if (msg instanceof Buffer) {
            var out = msg.toJSON();
            out.content = msg.toString();
            process.stdout.write(util.inspect(out, {
                colors: true,
                depth: null
            }));
        } else if (msg instanceof Error) {
            process.stdout.write(color('Name:    ') + colors.white(msg.name) + '\n');
            process.stdout.write(color('Message: ') + colors.white(msg.message) + '\n');
            process.stdout.write(color('Stack:\n') + colors.gray(msg.stack));
        } else if (msg instanceof Array || msg instanceof Object) {
            process.stdout.write(util.inspect(msg, {
                colors: true,
                depth: null
            }));
        } else { // 其他类型直接转string输出
            process.stdout.write(color(msg));
        };
        process.stdout.write('\n');
    };
}
