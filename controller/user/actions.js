const User = require("../../model/User")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
module.exports.blockUser = async (req, res, next) => {
  const userid = req.userid
  const { id } = req.params
  if (userid === id) return res.json({ success: false })
  try {
    const user = await User.findById(ObjectId(id))
    if (!user.blockedList.includes(ObjectId(id))) {
      await user.updateOne({ $push: { blockedList: ObjectId(userid) } })
      res.json({ success: true, alreadyBlocked: false })
    } else {
      res.json({ success: false, alreadyBlocked: true })
    }
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}
module.exports.unBlockUser = async (req, res, next) => {
  const userid = req.userid
  const { id } = req.params
  if (userid === id) return res.json({ success: false })
  try {
    const user = await User.findById(id)
    if (user.following.includes(id)) {
      await user.updateOne({ $pull: { followers: ObjectId(userid) } })
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (error) {
    res.json({ success: false })
  }
}
