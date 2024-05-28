const multer = require("multer");

// Image Storage Engine
module.exports.ManageUpload = (image_file) => {
  const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
  return upload.single(image_file);
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
