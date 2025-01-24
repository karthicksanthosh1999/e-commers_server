const { imageUploadUtils } = require("../../config/cloudnary");
const CustomeError = require("../../utils/customeErrorHandler");

const handleImageUpload = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);
    if (!result) {
      throw new CustomeError("Image not uploaded", 400);
    }
    res.status(200).json({
      message: "Image upload successfully",
      success: true,
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleImageUpload };
