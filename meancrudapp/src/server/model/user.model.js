const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    _id : { type: Object},
    name : { type: String },
    address : { type: String },
    email : { type: String }
}, 'User_Info');
