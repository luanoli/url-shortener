var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {
        type: String,
        default: ''
    }
}, {
    versionKey: false
});

var User = mongoose.model('User', UserSchema);

module.exports = User;