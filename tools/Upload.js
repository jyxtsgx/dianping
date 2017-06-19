const path = require('path');
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(req);
        // console.log(file);
        var index = file.originalname.lastIndexOf('.');
        var ext = file.originalname.substring(index);
        cb(null, file.originalname.substring(0, index) + '-' + Date.now() + ext);
    }
});
module.exports = multer({ storage: storage });
