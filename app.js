var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  multer = require('multer'),
  bodyParser = require('body-parser')
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({
    dest: './public/uploads/',
    includeEmptyFields: true,
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file + 'upload starting');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    },
    onParseStart: function () {
        console.log('Form parsing started at: ', new Date());
    }
}));

require('./config/express')(app, config);

app.listen(config.port);

