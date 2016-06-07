// 将数据库里的数据字典数据生成为静态的js文件，共页面直接使用，提高效率。
'use strict';
var path = require('path');
var fs = require('co-fs');
var _ = require('lodash')
var logger = require('./logger');

var db = require('../models/db');

module.exports.build_ddic = function*(file_path) {
    file_path = file_path || 'generate_static';
    file_path = path.join(__dirname, '../assets/pages/js', file_path);

    var libs = {
        "region": db.models['common_ddic_region'],
        "indestry_types": db.models['hr_om_ddic_industry_type'],
        "company_types": db.models['hr_pa_ddic_company_type'],
        "contract_types": db.models['hr_pa_ddic_contract_type'],
        "contract_status": db.models['hr_pa_ddic_contract_status'],
        "school_types": db.models['hr_pa_ddic_school_type'],
        "education_types": db.models['hr_pa_ddic_education_type'],
        "degree_types": db.models['hr_pa_ddic_degree_type'],
        "relation_types": db.models['hr_pa_ddic_relation_type'],
        "ethnics": db.models['hr_pa_ddic_ethnic'],
        "religions": db.models['hr_pa_ddic_religion'],
        "marriages": db.models['hr_pa_ddic_marriage'],
        "party": db.models['hr_pa_ddic_party'],
        "gender": db.models['hr_pa_ddic_gender'],
    };
    var keys = Object.keys(libs);
    for (var i = 0; i < keys.length; i++) {
        process.stdout.write('building ' + keys[i] + ' ...');
        yield build_ddic_data(file_path, keys[i], libs[keys[i]]);
        process.stdout.write('\tDone\n');
    };


    // var cond = {
    //     order: ['code']
    // };

    // try {
    //     var company_types = yield CompanyType.findAll(cond);
    //     var contract_types = yield ContractType.findAll(cond);
    //     var school_types = yield SchoolType.findAll(cond);
    //     var education_types = yield EducationType.findAll(cond);
    //     var degree_types = yield DegreeType.findAll(cond);
    //     var relation_types = yield RelationType.findAll(cond);

    //     var ddic = {};
    //     ddic.company_types = _.map(company_types, function (x) {
    //         return x.toJSON();
    //     });
    //     ddic.contract_types = _.map(contract_types, function (x) {
    //         return x.toJSON();
    //     });
    //     ddic.school_types = _.map(school_types, function (x) {
    //         return x.toJSON();
    //     });
    //     ddic.education_types = _.map(education_types, function (x) {
    //         return x.toJSON();
    //     });
    //     ddic.degree_types = _.map(degree_types, function (x) {
    //         return x.toJSON();
    //     });
    //     ddic.relation_types = _.map(relation_types, function (x) {
    //         return x.toJSON();
    //     });


    //     console.log(JSON.stringify(ddic))
    //     var data = 'var DDIC=' + JSON.stringify(ddic) + ';';
    //     yield fs.writeFile('ddic.js', data);

    //     return 1;
    // } catch (e) {
    //     logger(e, 4);

    // }
};

var build_ddic_data = function*(filepath, name, model) {
    var data = yield model.findAll({
        order: ['code']
    });
    var data2 = _.map(data, function(x) {
        return x.toJSON();
    });
    // write file
    var lines = ['if(typeof DDIC === "undefined"){DDIC={};}'];
    lines.push('DDIC.' + name + '=' + JSON.stringify(data2));
    yield fs.writeFile(path.join(filepath, name + '.js'), lines.join(''));
    return 'Done';
};
