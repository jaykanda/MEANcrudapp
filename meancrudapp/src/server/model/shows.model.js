const mongoose = require('mongoose');

module.exports = mongoose.model('Shows', {
    _id : { type: Object},
    show_name : { type: String },
    date : { type: Date },
    movie_id : { type: Object},
    theater_id : { type: Object}
}, 'Shows_Info');

