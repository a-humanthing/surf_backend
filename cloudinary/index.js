const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const photoStore = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Surf_photos",
    allowedFormats: ["jpeg", "png", "jpg", "webp", "jfif"],
  },
})

const videoStore = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Surf_videos",
    allowedFormats: ["mp4", "mkv", "avc", "webp"],
  },
})

module.exports = { cloudinary, photoStore, videoStore }
