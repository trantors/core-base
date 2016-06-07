// 初始化七牛的配置
"use strict";
var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'hL9oM59MI0hhm09LhbLyeEVLspw7P8weE9gD2wLg';
qiniu.conf.SECRET_KEY = 'weM1VXJ42JnYLkWU-JnrHlh5CUq8YVJk0e1TTx7Z';

module.exports = qiniu;