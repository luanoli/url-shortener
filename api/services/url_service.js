var mongoose = require('mongoose');
var User = require('../models/userModel');

var urlService = {

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