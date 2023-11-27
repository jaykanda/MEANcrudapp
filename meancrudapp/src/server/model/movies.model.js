const mongoose = require('mongoose');

module.exports = mongoose.model('Movie', {
    // _id : { type: Object},
    movie_name : { type: String },
    city_id : {type: Object},
    theater_id : { type: Object }
}, 'Movies_Info');

