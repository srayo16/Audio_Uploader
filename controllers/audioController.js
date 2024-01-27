const mongoose = require('mongoose');
const Audio = mongoose.model("Audios");
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');

const getRandomString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

exports.createAudio = async (req, res) => {
    try {
        const uploader = async (path) => await cloudinary.uploads(path, "Audios");
        // console.log(req.file)

        let pathName = `${req.file.destination}${req.file.filename}`
        // console.log(pathName)

        const uploadToCloudinary = await uploader(pathName)
        // console.log("upload",uploadToCloudinary)

        if (uploadToCloudinary && uploadToCloudinary?.url && uploadToCloudinary?.id) {
            const audio = new Audio({
                audio: uploadToCloudinary?.url,
                cloudinary_ID: uploadToCloudinary?.id
            });

            await audio.save();
            fs.unlinkSync(pathName);
            return res.status(200).send('Audio uploaded successfully!');
        }

        return res.status(500).json("An error occurred with cloudinary!");

    } catch (error) {
        console.error(error);
        return res.status(500).json("An error occurred!");
    }
}

exports.getAllAudios = async (req, res) => {
    try {
        const audio = await Audio.find({});

        if (!audio) {
            return res.status(404).send('Audio not found');
        }

        return res.json({ message: "Data Found!", data: audio });

    } catch (error) {
        console.error(error?.message);
        res.status(500).json("An error occurred!");
    }
}