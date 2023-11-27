const mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    _id : { type: Object},
    fullName : { type: String },
    position : { type: String },
    location : { type: String },
    salary : { type: Number }
}, 'Employee_Info')