process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var db = require('../api/config/db');
var Url = require('../api/models/urlModel');
var User = require('../api/models/userModel');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Url', function() {
    it('Deve zerar a tabela de urls', function(done) {
        Url.remove({}, function(error) {
            done();
        });
    });
});

describe('User', function() {
    it('Deve zerar a tabela de users', function(done) {
        User.remove({}, function(error) {
            done();
        });
    });
});

describe('POST /users/:userid/urls', function() {
    it('Deve inserir a nova url e retornar o objeto criado', function(done) {

        var url = {
            url: "http://www.github.com"
        };
        chai.request(server)
            .post('/users/luan/urls')
            .send(url)
            .end(function(error, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('hits');
                res.body.should.have.property('url');
                res.body.should.have.property('shortUrl');
                done();
            });
    });

    it('Deve inserir outra nova url e retornar o objeto criado', function(done) {

        var url = {
            url: "http://www.google.com"
        };
        chai.request(server)
            .post('/users/luan/urls')
            .send(url)
            .end(function(error, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('hits');
                res.body.should.have.property('url');
                res.body.should.have.property('shortUrl');
                done();
            });
    });

    it('Deve retornar 400 ao tentar inserir com body invalido', function(done) {

        var url = {};
        chai.request(server)
            .post('/users/luan/urls')
            .send(url)
            .end(function(error, res) {
                res.should.have.status(400);
                done();
            });
    });
});

describe('GET /stats', function() {
    it('Deve retornar as estatisticas globais', function(done) {
        chai.request(server)
            .get('/stats')
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.urlCount.should.be.eql(2);
                res.body.hits.should.be.eql(0);
                res.body.topUrls.length.should.be.eql(2);
                done();
            });
    });
});

describe('GET /users/:userId/stats', function() {
    it('Deve retornar as estatisticas por usuario', function(done) {
        chai.request(server)
            .get('/users/luan/stats')
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.urlCount.should.be.eql(2);
                res.body.hits.should.be.eql(0);
                res.body.topUrls.length.should.be.eql(2);
                done();
            });
    });

    it('Deve retornar 404 para usuario inexistente', function(done) {
        chai.request(server)
            .get('/users/teste/stats')
            .end(function(error, res) {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET /stats/:id', function() {
    it('Deve retornar as estatisticas de uma url especifica', function(done) {
        Url.findOne({
            url: "http://www.github.com"
        }, function(err, urlObject) {
            chai.request(server)
                .get('/stats/' + urlObject.id)
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('id');
                    res.body.should.have.property('hits');
                    res.body.should.have.property('url');
                    res.body.should.have.property('shortUrl');
                    res.body.id.should.be.eql(urlObject.id);
                    res.body.hits.should.be.eql(0);
                    res.body.url.should.be.eql("http://www.github.com");
                    done();
                });
        });
    });

    it('Deve retornar 404 url inexistente', function(done) {
        chai.request(server)
            .get('/stats/999')
            .end(function(error, res) {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET /urls/:id', function() {
    it('Deve retornar 301', function() {

        Url.findOne({
            url: "http://www.github.com"
        }, function(err, urlObject) {
            chai.request(server)
                .get('/urls/' + urlObject.id)
                .end(function(error, res) {
                    res.should.have.status(301);
                    done();
                });
        });
    });
});

describe('DELETE /urls/:id', function() {
    it('Deve excluir a url pelo id', function(done) {
        Url.findOne({
            url: "http://www.google.com"
        }, function(err, urlObject) {
            chai.request(server)
                .delete('/urls/' + urlObject.id)
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.empty;
                    done();
                });
        });

    });
});

describe('POST /users', function() {
    it('Deve inserir um usuario e retornar 201', function(done) {
        var user = {
            id: "joao"
        };
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function(error, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.id.should.be.eql('joao');
                done();
            });
    });

    it('Deve tentar inserir um usuario com mesmo id e retornar 409', function(done) {
        var user = {
            id: "joao"
        };
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function(error, res) {
                res.should.have.status(409);
                done();
            });
    });
});

describe('DELETE /user/:userId', function() {
    it('Deve excluir um usuario pelo id', function(done) {
        User.findOne({
            id: "joao"
        }, function(err, user) {
            chai.request(server)
                .delete('/user/' + user.id)
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.empty;
                    done();
                });
        });

    });
});