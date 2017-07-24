var express = require('express');
var db = require('./api/config/db');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./api/services'));

app.listen(port);

console.log('URL Shortener RESTful API server started on: ' + port);