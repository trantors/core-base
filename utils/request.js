var httpx = require('httpx');
var streamx = require('streamx');
var extend = require('util')._extend;

var Request = function (defaults) {
    this.defaults = defaults || {};
};
/**
 * 用于设置urllib的默认options * Examples:
 * ```
 * api.setOpts({timeout: 15000});
 * ```
 * @param {Object} opts 默认选项
 */
Request.prototype.setOpts = function (opts) {
    this.defaults = opts;
};
/**
 * 设置urllib的hook
 */
Request.prototype.request = function* (url, opts) {
    var options = {};
    extend(options, this.defaults);
    opts || (opts = {});
    for (var key in opts) {
        if (key !== 'headers') {
            options[key] = opts[key];
        } else {
            if (opts.headers) {
                options.headers = options.headers || {};
                extend(options.headers, opts.headers);
            }
        }
    }
    var res = yield httpx.request(url, options);
    if (res.statusCode < 200 || res.statusCode > 204) {
        var err = new Error("url: " + url + ", status code: " + res.statusCode);
        err.name = "RequestError";
        throw err;
    }

    var buffer = yield streamx.read(res);
    var contentType = res.headers['content-type'] || '';
    if (contentType.indexOf('application/json') !== -1) {
        var data;
        try {
            data = JSON.parse(buffer);
        } catch (ex) {
            var err = new Error('JSON.parse error. buffer is ' + buffer.toString());
            err.name = "RequestError";
            throw err;
        }
        if (data && data.errcode) {
            var err = new Error(data.errmsg);
            err.name = 'RequestError';
            err.code = data.errcode;
            throw err;
        }

        return data;
    }

    return buffer;
};

module.exports.Request = Request;

module.exports.postJSON = function (data) {
    return {
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};