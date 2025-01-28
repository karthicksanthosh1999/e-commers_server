const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dtxon4p2x",
  api_key: "965374564472481",
  api_secret: "LBF8Yjf5lyMYUVfCuE3n_6fO-3I",
});

const storage = new multer.memoryStorage();

// Image upload utils
const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

// Image delete utils
const imageDeleteUtils = async (url) => {
  const parts = url.split("/upload/");
  let publicId = parts[1].split(".")[0];
  console.log(publicId);
  const isDeleted = await cloudinary.uploader.destroy(publicId);
  return isDeleted;
};

const upload = multer({ storage });

module.exports = {
  upload,
  imageUploadUtils,
  imageDeleteUtils,
};
