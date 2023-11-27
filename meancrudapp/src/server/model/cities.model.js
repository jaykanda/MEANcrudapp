const mongoose = require('mongoose');

module.exports = mongoose.model('Cities', {
    _id : { type: Object},
    city_name : { type: String },
    movie_id : { type: Object}
}, 'City_Info');

