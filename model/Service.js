const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema(
  {
    serviceType: { type: String, required: true },
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    range: { type: Number },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Service", serviceSchema)
