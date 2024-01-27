const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    audio: {
        type: String
    },
    cloudinary_ID: {
        type: String
    }
}, {
    timestamps: true
});

const audioModel = mongoose.model('Audios', audioSchema);
module.exports = audioModel;