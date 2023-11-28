const mongoose = require('mongoose');

module.exports = mongoose.model('Cities', {
    _id : { type: Object},
    city_name : { type: String }
}, 'City_Info');

