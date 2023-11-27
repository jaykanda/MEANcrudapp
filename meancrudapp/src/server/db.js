const mongoose = require('mongoose');

// const dbURL = 'mongodb://127.0.0.1:27017/JC_Company';

const dbURL = 'mongodb://127.0.0.1:27017/MovieBooking';


module.exports = () => {
    return mongoose.connect(dbURL);
};
