var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

// String de conexão
var dbURI = 'mongodb://localhost/url-shortener';

// Cria a conexão
mongoose.connect(dbURI);

autoIncrement.initialize(mongoose.connection);