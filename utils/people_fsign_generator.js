// 用户－功能对应表生成器
'use strict';
var _ = require('lodash');
var extend = require('util')._extend;

var db = require('../models/db');
var People = db.models['people'];
var PeopleFunction = db.models['people_function'];
var PeopleRole = db.models['people_role'];
var SYSRole = db.models['sys_role'];
var SYSRoleFunction = db.models['sys_role_function'];
var SYSLandscape = db.models['sys_landscape'];



module.exports.gen_by_people = function* (people) {
    return yield gen_fsign_by_people(people);
}

// 生成指定人员的功能清单数据
var gen_fsign_by_people = function* (people_id) {
    // 选出人员身上的角色
    // var prs = yield PeopleRole.find({
    //     where: {
    //         people: people_id
    //     }
    // });
    var str_sql = ["SELECT",
        "", ["people_role.people",
            "people_role.role",
            "sys_role_function.fsign",
            "sys_role_function.exclude",
        ].join(', '),

        "FROM", "", ["public.sys_role_function",
            "public.people_role",
        ].join(', '),

        "WHERE",
        "people_role.role = sys_role_function.role",
        "ORDER BY",
        "people_role.people ASC,",
        "sys_role_function.fsign ASC;"
    ].join(' ');
    var ret = yield db.query(str_sql, {
        type: db.QueryTypes.SELECT
    });
    // console.log(ret);
    var fgs = _.pluck(ret, ["fsign"]);
    // console.log(fgs);
    var likes = [];
    for (var i = 0; i < fgs.length; i++) {
        likes.push({
            $like: fgs[i]
        })
    }

    // 拼接查询条件
    var cond_where = {
        fsign: {
            $or: likes
        }
    };
    // console.log(cond_where);
    var funcs = yield SYSLandscape.findAll({
        attributes: ['fsign'],
        where: cond_where
    });
    // 先删除
    yield PeopleFunction.destroy({
        where: {
            people: people_id
        }
    });
    // 再创建
    for (var i = 0; i < funcs.length; i++) {
        yield PeopleFunction.create({
            people: people_id,
            fsign: funcs[i].fsign
        });
    }
    return 'DONE';
    // console.log(_.map(funcs, function (x) {
    //     return x.toJSON();
    // }));
};
