const path = require('path');
const multer  = require('multer');

function UpLoader(options) {
    let baseSavePath = 'public/uploads/';
    let savePath = baseSavePath;
    if (typeof options.savePath == 'string') {
        savePath += options.savePath;
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(file);
            cb(null, savePath);
        },
        filename: function (req, file, cb) {
            // console.log(req);
            // console.log(file);
            var index = file.originalname.lastIndexOf('.');
            var ext = file.originalname.substring(index);
            cb(null, file.originalname.substring(0, index) + '-' + Date.now() + ext);
        }
    });

    return multer({ storage: storage });
}

module.exports = UpLoader;
