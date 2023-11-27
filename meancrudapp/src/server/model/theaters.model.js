const mongoose = require('mongoose');

module.exports = mongoose.model('Theaters', {
    theater_name : { type: String },
    movie_name : { type: String },
    city : { type: String },
    seats : { type: Array },
    showTime: { type: Array },
    ticketprice: { type: Number}
}, 'Theater_Info');

