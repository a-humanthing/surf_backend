const User = require("../../model/User")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

module.exports.followUser = async (req, res, next) => {
  const userid = req.userid
  const { id } = req.params
  if (userid === id) return res.json({ success: false })
  try {
    const user = await User.findById(ObjectId(id))
    const currentUser = await User.findById(ObjectId(userid))
    if (!currentUser.following.includes(ObjectId(id))) {
      await user.updateOne({ $push: { followers: ObjectId(userid) } })
      await currentUser.updateOne({ $push: { following: ObjectId(id) } })
      console.log("user = ", user)
      console.log("curr = ", currentUser)
      res.json({ success: true, alreadyFollowed: false })
    } else {
      console.log(" alredy following, err curr on top = ", currentUser)
      res.json({ success: false, alreadyFollowed: true })
    }
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}

module.exports.unfollowUser = async (req, res, next) => {
  const userid = req.userid
  const { id } = req.params
  if (userid === id) return res.json({ success: false })
  try {
    const user = await User.findById(id)
    const currentUser = await User.findById(userid)
    if (currentUser.following.includes(id)) {
      await user.updateOne({ $pull: { followers: ObjectId(userid) } })
      await currentUser.updateOne({ $pull: { following: ObjectId(id) } })
      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (error) {
    res.json({ success: false })
  }
}

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
