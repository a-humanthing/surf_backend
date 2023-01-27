const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema(
  {
    serviceType: { type: String, required: true },
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    range: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    stars: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
)
module.exports = mongoose.model("Service", serviceSchema)
