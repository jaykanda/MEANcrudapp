const mongoose = require('mongoose');

module.exports = mongoose.model('Payments', {
    _id : { type: Object},
    user_id : { type: Object },
    amount : { type: Number },
    timestamp : { type: Date }
}, 'Payments_Info');



