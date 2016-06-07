// 连接数据库
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var co = require('co');
var Sequelize = require('sequelize');
var config = require('../config');

var db_cfg = config.db;
console.log("postgres://%s:%d",  db_cfg.host,  db_cfg.port);
var sequelize = new Sequelize(db_cfg.database, db_cfg.username, db_cfg.password, {
    host: db_cfg.host,
    port: db_cfg.port,
    dialect: 'postgres',
    pool: db_cfg.pool,
});

module.exports = sequelize;

// load all model files
// var model_path = path.join(__dirname, '.');
// var model_files = fs.readdirSync(model_path);
// model_files.splice(model_files.indexOf('db.js'), 1);
// process.stdout.write('Start loading [' + colors.green(model_files.length) + '] model files:\n');
// process.stdout.write('---------------------------------------------------\n');
// var start = new Date();
// var max_length = 0;
// for (var i = 0; i < model_files.length; i++) {
//     if (max_length < model_files[i].length) { max_length = model_files[i].length; }
// }
// for (var i = 0; i < model_files.length; i++) {
//     var m = model_files[i];
//     var ms = expand(m, max_length);
//     process.stdout.write('Loading ' + colors.yellow(ms));
//     require('./' + m);
//     process.stdout.write(colors.green(' \tDONE\n'));
// };
// var end = new Date();
// process.stdout.write('---------------------------------------------------\n');
// process.stdout.write('[' + colors.green(model_files.length) + '] files with [' + colors.cyan(Object.keys(sequelize.models).length) + '] tables successful loaded in ' + colors.green(end - start) + 'ms.\n');

// function expand(str, len) {
//     if (str.length < len) {
//         var x = len - str.length
//         for (var i = 0; i < x; i++) {
//             str += ' ';
//         }
//     }
//     return str;
// }

// co(function* (sequelize) {
//     // process.stdout.write('Sync data tables...');
//     try {
//         yield sequelize.sync();
//     } catch (e) {
//         console.log(e);
//     }
//     process.stdout.write(colors.green('Database sync... \tDONE!\n'));
// }(sequelize));
