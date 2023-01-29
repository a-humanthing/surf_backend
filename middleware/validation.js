const { serviceSchema } = require("../validation/joi")
module.exports.serviceJoiValidation = async (req, res, next) => {
  const { error } = serviceSchema.validate(req.body)
  console.log("err", error)
  if (error) {
    const msg = error.details.map((item) => item.message).join(",")
    console.log("err msg-", msg)
    return res.json({ success: false, errorMsg: msg })
  } else {
    console.log("service validated")
    next()
  }
}
