const mongoose = require('mongoose');
const config = require('./development');

mongoose.connect(config?.db)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err))

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

require('../models/audioModel');