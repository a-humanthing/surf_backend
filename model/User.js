const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    profilePic: {
      type: String,
    },
    dob: {
      type: Date,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    socialMediaHandles: {
      //reference in docs
      type: Map,
      of: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema)
