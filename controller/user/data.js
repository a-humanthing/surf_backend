const jwt = require("jsonwebtoken")
const User = require("../../model/User")
const mongoose = require("mongoose")
const Post = require("../../model/Post")
const ObjectId = mongoose.Types.ObjectId

module.exports.sendProfileCardData = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification error = ", err)
      res.status(403).json({ success: false })
    } else {
      const id = authorizedData.id
      //   const user = await User.findById(id)
      const data = await User.aggregate([
        { $match: { _id: ObjectId(id) } },
        { $project: { fullName: 1, userName: 1, profilePic: 1 } },
      ])
      console.log(data)
      const user = data[0]

      res.status(200).json({ success: true, user })
    }
  })
}

module.exports.sendProfileData = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification error = ", err)
      res.status(403).json({ success: false })
    } else {
      const id = authorizedData.id
      const data = await User.findById(id).populate("services")
      console.log("profiledata=", data)
      data.password = undefined
      res.status(200).json({ success: true, data })
    }
  })
}

module.exports.sendUserPosts = async (req, res, next) => {
  const userid = req.userid
  const user = await User.findById(ObjectId(userid)).populate({
    path: "posts",
    populate: {
      path: "userId",
      // path: "comments",
      // populate: { path: "userId" },
    },
  })
  console.log("user = ", user)
  const posts = user.posts
  res.json({ success: true, posts })
}

module.exports.sendHomefeeds = async (req, res, next) => {
  const userid = req.userid
  // const user = await User.findById(ObjectId(userid)).populate({
  //   path: "following",
  //   populate: { path: "posts" },
  // })
  const feeds = await Post.find({}).populate("userId")
  feeds.forEach((item) => {
    item.userId.password = undefined
  })
  console.log("feeds = ", feeds)
  // feeds.userId.password = undefined
  res.json({ success: true, feeds })
}

module.exports.sendUserData = async (req, res, next) => {
  const userid = req.userid
  const { username } = req.params
  const user = await User.findOne({ userName: username }).populate([
    {
      path: "posts",
      populate: { path: "userId" }, //, path: "comments"
    },
    { path: "services" },
  ])
  // const isFollowingData = await User.findOne({
  //   _id: userid,
  //   following: { $in: [user._id] },
  // })
  const currentUser = await User.findById(userid).populate({
    path: "posts",
  })
  console.log("isfollow = ", currentUser)
  let isFollowing
  currentUser.following.includes(user._id)
    ? (isFollowing = true)
    : (isFollowing = false)

  if (!user) return res.json({ success: false })
  user.password = undefined
  const posts = user.posts

  res.json({ success: true, user, posts, isFollowing })
}

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

module.exports.sendUserById = async (req, res, next) => {
  try {
    const { userid } = req.params
    const user = await User.findById(ObjectId(userid))
    user.password = undefined
    res.json({ success: true, friend: user })
  } catch (error) {
    console.log("error 5", error)
    res.json({ success: false })
  }
}
