var mongoose = require('mongoose');
var User = require('../models/userModel');
var Url = require('../models/urlModel');
var random = require('../utils/random');

var urlService = {

    getUrlById: function(req, res) {
        var id = req.params.id;

        Url.findOne({
            id: id
        }, function(err, urlObject) {
            if (urlObject === null || urlObject === undefined) {
                res.status(404);
                res.end();
            } else {
                res.writeHead(301, {
                    Location: urlObject.url
                });
                res.end();
            }
        });
    },

    hitUrl: function(req, res) {
        var randomUrl = req.params.randomurl;

        Url.findOne({
            shortUrl: req.protocol + '://' + req.get('host') + '/' + randomUrl
        }, function(err, urlObject) {

            if (urlObject === null || urlObject === undefined) {
                res.status(404);
                res.end();
            } else {
                urlObject.hits += 1;
                urlObject.save();

                res.writeHead(301, {
                    Location: urlObject.url
                });
                res.end();
            }

        });
    },

    createUrl: function(req, res) {


        if (typeof req.body.url === 'undefined' || !req.body.url) {

            res.status(400);
            var err = new Error('Bad Request');
            err.status = 400;
            res.end();
            return;
        }

        User.findOne({
            id: req.params.userid
        }, function(err, userObject) {

            if (userObject === null || userObject === undefined) {
                User.create({
                    id: req.params.userid
                });
            }

            var value = [];
            for (var i = 0; i <= 7; i++) {
                value[i] = random.randomSimbol();
            }
            var shortUrl = req.protocol + '://' + req.get('host') + '/' + value.join('');

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

        });

    },

    deleteUrl: function(req, res) {

        Url.remove({
            id: req.params.id
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({});
            }
        });

    },

    createUser: function(req, res) {

        if (!req.body.id) {

            res.status(400);
            var err = new Error('Bad Request');
            err.status = 400;
            res.json({
                message: err.status + ' ' + err
            });

        } else {

            User.findOne({
                id: req.body.id
            }, function(err, u) {

                if (err) {
                    console.log(err);
                } else {
                    if (u !== null) {
                        res.status(409);
                        res.end();
                        return;
                    } else {
                        User.create({
                            id: req.body.id
                        }, function(err, user) {
                            if (err) {
                                return console.log(err);
                            } else {
                                res.status(201);
                                res.json({
                                    "id": user.id
                                });
                            }
                        });
                    }
                }

            });

        }

    },

    getStats: function(req, res) {
        statsUtil(res);
    },

    getStatsByUser: function(req, res) {
        statsUtil(res, req.params.userid);
    },

    getStatsByUrl: function(req, res) {

        Url.findOne({
                id: req.params.id
            },
            'id hits url shortUrl -_id',
            function(err, url) {

                if (url === null) {
                    res.status(404);
                    res.end();
                    return;
                }

                if (err) {
                    return console.log(err);
                } else {
                    res.status(200);
                    res.json(url);
                }
            });

    },

    getUsers: function(req, res) {

        User.find({}, '-_id', function(err, users) {
            if (err) {
                return console.log(err);
            } else {
                res.status(200);
                res.json(users);
            }
        });

    },

    deleteUser: function(req, res) {

        User.remove({
            id: req.params.userid
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({});
            }
        });

    }

};

var statsUtil = function(res, userid) {

    var conditions = {};

    if (userid !== undefined) {
        conditions = {
            userid: userid
        };
    }

    // Count urls
    Url.count(conditions, function(err, c) {

        if (err) {
            console.log(err);
        } else {

            if (userid !== undefined && c === 0) {
                res.status(404);
                res.end();
                return;
            }

            var count = c;
            // Sum total hits
            Url.find(conditions, 'hits', function(err, urlHits) {

                if (err) {
                    console.log(err);
                } else {

                    var hitsTotal = 0;

                    for (var i in urlHits) {
                        hitsTotal += urlHits[i].hits;
                    }
                    // Get top 10 urls with more hits
                    Url.find(conditions, 'id hits url shortUrl -_id', {
                            skip: 0,
                            limit: 10,
                            sort: {
                                hits: -1
                            }
                        },
                        function(err, urls) {

                            if (err) {
                                return console.log(err);
                            } else {
                                res.status(200);
                                res.json({
                                    "hits": hitsTotal,
                                    "urlCount": count,
                                    "topUrls": urls
                                });
                            }
                        });
                }
            });
        }
    });
};

module.exports = urlService;