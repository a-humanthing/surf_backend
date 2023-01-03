const mongoose = require("mongoose")
const Schema = mongoose.Schema

const otpVerification = new Schema(
  {
    email: String,
    otp: String,
    expiresAt: Date,
  },
  { timestamps: true }
)

module.exports = mongoose.model("Otp", otpVerification)
