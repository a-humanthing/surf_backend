const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviveNameSchema = new Schema(
  {
    serviceName: String,
    updated: Boolean,
  },
  { timestamps: true }
)
module.exports = mongoose.model("Servicename", serviveNameSchema)
