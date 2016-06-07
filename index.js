var fs = require('fs');
var path = require('path');

//--------
process.stdout.write("Start Loading Core Base... \n");

var model_path = path.join(__dirname, 'models');
var model_files = fs.readdirSync(model_path);
model_files.splice(model_files.indexOf('db.js'), 1);

var models = {};
for (var i = 0; i < model_files.length; i++) {
    var m = model_files[i];
    // var ms = expand(m, max_length);
    // process.stdout.write('Loading ' + colors.yellow(ms));
    // require('./' + m);
    // process.stdout.write(colors.green(' \tDONE\n'));
    var model_name = path.basename(m, path.extname(m));
    console.log('loading', model_name);
    models[model_name] = require('./models/' + model_name);
};

// module.exports.models = models;

module.exports.routes = require('./routes/main');

process.stdout.write("Core Base Loaded. \n");
