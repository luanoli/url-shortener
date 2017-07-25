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

describe('/users/:userid/urls', function() {
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
});

describe('/stats', function() {
    it('Deve retornar as estatisticas globais', function(done) {
        chai.request(server)
            .get('/stats')
            .end(function(error, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.urlCount.should.be.eql(1);
                res.body.hits.should.be.eql(0);
                res.body.topUrls.length.should.be.eql(1);
                done();
            });
    });
});

describe('/urls/:id', function() {
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