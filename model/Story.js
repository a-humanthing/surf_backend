const mongoose = require("mongoose")
const Schema = mongoose.Schema
const storySchema = new Schema(
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
    views: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    expireAt: {
      type: Date,
      /* Defaults 1 days from now */
      default: new Date(new Date().valueOf() + 86400000),
      /* Remove doc 60 seconds after specified date */
      expires: 60,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Story", storySchema)
