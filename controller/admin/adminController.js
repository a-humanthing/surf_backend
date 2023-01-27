const User = require("../../model/User")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { adminPass, adminName } = req.body
    if (adminName === "surfer" && adminPass === "1234") {
      return res.json({ success: true, adminName })
    } else {
      return res.json({ success: false })
    }
  } catch (error) {
    console.log("erro admin login", error)
    res.json({ success: false })
  }
}
module.exports.sendUserList = async (req, res, next) => {
  try {
    const users = await User.find({})
    users.forEach((item) => (item.password = undefined))
    res.json({ success: true, users })
  } catch (error) {
    console.log("erro userlist", error)
    res.json({ success: false })
  }
}

module.exports.terminateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await User.findById(ObjectId(userId))
    if (user.isTerminated) {
      const up = await User.findByIdAndUpdate(ObjectId(userId), {
        isTerminated: false,
      })
      console.log("unterminated", up)
      return res.json({ success: true, isTerminated: false })
    } else {
      user.updateOne({ $set: { isTerminated: true } })
      const up = await User.findByIdAndUpdate(ObjectId(userId), {
        isTerminated: true,
      })
      console.log("terminated", up)
      return res.json({ success: true, isTerminated: true })
    }
  } catch (error) {
    console.log("erro terminate", error)
    res.json({ success: false })
  }
}
