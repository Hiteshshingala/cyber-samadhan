const multer = require("multer");
const path = require("path");

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "public/images/uploads");
        },
        filename: function (req, file, callback) {
            callback(
                null,
                file.fieldname + "-" + Date.now() + path.extname(file.originalname)
            );
        }
    })
})


module.exports = upload;
