const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, __basedir + '/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const filename = Date.now() + "." + ext;
        req.filename = filename;
        cb(null, filename);
    },
});

// const storage = multer.memoryStorage();

const uploadFile = multer({
    storage: storage
});
module.exports = uploadFile;

