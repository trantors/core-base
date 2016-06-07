'use strict';

var _ = require('lodash')
var logger = require('./logger');

/**
 * 构造函数
 * @param {Object} opts 构造参数
 */
var PGSQLSession = function (opts) {
    this.db = opts.db;
    var table = opts.table || 'sys_session'
    this.session_table = this.db.models[table];
};

PGSQLSession.prototype.get = function* (sid) {
    logger('get sid:' + sid, 4);
    var res = yield this.session_table.findOne({
        where: {
            sid: sid
        }
    });
    if (res) {
        logger(res.toJSON(), 4);
    };
    return res ? res.data : null;
}

PGSQLSession.prototype.set = function* (sid, session) {
    // check if there is a doc with that id
    logger('set session:', 4)
    logger({
        sid: sid,
        session: session
    }, 4);

    var res = yield this.session_table.upsert({
        sid: sid,
        data: _.extend({
            sid: sid
        }, session)
    });
    return res;
}

PGSQLSession.prototype.destroy = function* (sid) {
    logger('destroy:' + sid, 4);
    return yield this.session_table.destroy({
        where: {
            sid: sid
        }
    });
}

module.exports = PGSQLSession
