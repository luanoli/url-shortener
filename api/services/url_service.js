var mongoose = require('mongoose');
var User = require('../models/userModel');
var Url = require('../models/urlModel');
var random = require('../utils/random');

var urlService = {

    createUrl: function(req, res) {

        var value = [];
        for (var i = 0; i <= 7; i++) {
            value[i] = random.randomSimbol();
        }
        var shortUrl = "http://short.url/" + value.join('');

        Url.create({            
            hits: 0,
            url: req.body.url,
            shortUrl: shortUrl,
            userid: req.params.userid
        }, function(err, url) {
            if (err) {
                return console.log(err);
            } else {
                res.status(201);
                res.json(url);
            }
        });
    },

    deleteUrl: function(req, res){

        Url.remove({
            id: req.params.id
        }, function(err) {
            if (err) return handleError(err);
            res.json({});
        });

    },

    createUser: function(req, res) {

        if (!req.body.userid) {

            res.status(400);
            var err = new Error('Bad Request');
            err.status = 400;
            res.json({
                message: err.status + ' ' + err
            });

        } else {
            User.create({
                userid: req.body.userid
            }, function(err, user) {
                if (err) {
                    return console.log(err);
                } else {
                    res.status(201);
                    res.json(user);
                }
            });
        }

    },

    getStats: function(req, res) {

    },

    getUsers: function(req, res) {

        User.find({}, '-_id', function(err, users) {
            if (err) {
                return console.log(err);
            } else {
                res.json(users);
            }
        });

    },

    deleteUser: function(req, res) {

        User.remove({
            userid: req.params.userid
        }, function(err) {
            if (err) return handleError(err);
            res.json({});
        });

    }

};

module.exports = urlService;