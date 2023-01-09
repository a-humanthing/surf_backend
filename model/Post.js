const mongoose = require("mongoose")
const Schema = mongoose.Schema
const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    caption: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)
