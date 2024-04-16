import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  try {
    const base64 = file.buffer.toString("base64");
    const data = "data:" + req.file.mimetype + ";base64," + base64;
    const res = await cloudinary.uploader.upload(data);
    return res.secure_url;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const deleteImage = async (url) => {
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
}; 