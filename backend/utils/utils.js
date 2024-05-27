const multer = require("multer");

// Image Storage Engine
module.exports.ManageUpload = async () => {
  const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
};