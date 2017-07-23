var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
    id: {
        type: String,
        default: ''
    },
    hits: {
        type: Number,
        min: 0
    },
    url: {
        type: String,
        default: ''
    },
    shortUrl: {
        type: String,
        default: ''
    },
    userid: {
        type: Number,
        min: 0
    }
}, {
    versionKey: false
});

var Url = mongoose.model('Url', UrlSchema);

module.exports = Url;