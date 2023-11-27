const mongoose = require('mongoose');

module.exports = mongoose.model('Bookings', {
    theater_id : { type: String },
    moviename : { type: String },
    theatername : { type: String },
    payment : { type: Number },
    seats: { type: Array},
    showtime: { type: Array },
    bookingdate: { type: Date }
}, 'Bookings_Info');


