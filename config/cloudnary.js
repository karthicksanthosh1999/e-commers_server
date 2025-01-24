const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dtxon4p2x",
  api_key: "965374564472481",
  api_secret: "LBF8Yjf5lyMYUVfCuE3n_6fO-3I",
});

const storage = new multer.memoryStorage();
const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

const upload = multer({ storage });

module.exports = {
  upload,
  imageUploadUtils,
};
