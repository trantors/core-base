'use strict';
var url = require('url');
var tunnel = require("tunnel");

var http_proxy = process.env.http_proxy;
var agent = null;
if (http_proxy) {
    var parsedProxy = url.parse(http_proxy);
    var proxy = {};
    if (parsedProxy.hostname) { //主机
        proxy.host = parsedProxy.hostname
    };
    if (parsedProxy.port) { //端口
        proxy.port = parsedProxy.port
    };
    if (parsedProxy.auth) { //登录认证
        proxy.proxyAuth = parsedProxy.auth
    };
    agent = tunnel.httpOverHttp({
        proxy: proxy
    });
};

module.exports = agent;

