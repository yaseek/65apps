// System modules
var fs = require('fs');

// Third party modules
var express = require('express'),
    serveStatic = require('serve-static');

// Locals
var app = express();

app.use(serveStatic(__dirname + '/static'));
app.use(serveStatic(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.listen(8080);