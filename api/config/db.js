var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

// String de conexão
var dbURI = 'mongodb://localhost/url-shortener';

// Cria a conexão
mongoose.connect(dbURI);

autoIncrement.initialize(mongoose.connection);

// Eventos

// Sucesso
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// Erro
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// Conexão fechada
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// Conexão aberta
mongoose.connection.on('open', function () {
  console.log('Mongoose default connection is open');
});

// Se o node terminar fecha o mongoose também
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});