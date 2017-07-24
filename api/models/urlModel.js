var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

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
        type: String,
        default: ''
    }
}, {
    versionKey: false
});

UrlSchema.plugin(autoIncrement.plugin, { model: 'Url', field: 'id' });
var Url = mongoose.model('Url', UrlSchema);

module.exports = Url;