const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createAudio, getAllAudios } = require('../controllers/audioController');

router.post('/create-audio', upload.single('audio'), createAudio );
router.get('/get-audios', getAllAudios );

module.exports = router;