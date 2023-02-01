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
      const data = await User.findById(id).populate([
        { path: "services" },
        { path: "followers" },
        { path: "following" },
      ])
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
  const allfeeds = await Post.find({})
    .populate("userId")
    .sort({ createdAt: -1 })
    .limit(2)
  const feeds = allfeeds.filter((feed) => feed.userId.isTerminated === false)
  feeds.forEach((item) => {
    item.userId.password = undefined
  })

  // feeds.userId.password = undefined
  res.json({ success: true, feeds })
}

module.exports.sendFeedsOnScroll = async (req, res, next) => {
  const userid = req.userid
  const { loadCount } = req.params
  const loadfeeds = await Post.find({})
    .populate("userId")
    .sort({ createdAt: -1 })
    .limit(2)
    .skip(2 * loadCount)
  console.log("count-", loadCount)
  const feeds = loadfeeds.filter((feed) => feed.userId.isTerminated === false)
  feeds.forEach((item) => {
    item.userId.password = undefined
  })

  // feeds.userId.password = undefined
  res.json({ success: true, feeds })
}

module.exports.sendUserData = async (req, res, next) => {
  const userid = req.userid
  const { username } = req.params
  const user = await User.findOne({ userName: username }).populate([
    {
      path: "posts",
      populate: { path: "userId", path: "likes" }, //, path: "comments"
    },
    { path: "services" },
    { path: "followers" },
    { path: "following" },
  ])
  // const isFollowingData = await User.findOne({
  //   _id: userid,
  //   following: { $in: [user._id] },
  // })
  const currentUser = await User.findById(userid).populate({
    path: "posts",
  })
  let isFollowing
  let isBlocked
  currentUser.following.includes(user._id)
    ? (isFollowing = true)
    : (isFollowing = false)

  user.blockedList.includes(currentUser._id)
    ? (isBlocked = true)
    : (isBlocked = false)

  if (!user) return res.json({ success: false })
  user.password = undefined
  const posts = user.posts

  res.json({ success: true, user, posts, isFollowing, isBlocked })
}

module.exports.sendUserById = async (req, res, next) => {
  try {
    const { userid } = req.params
    console.log("usid:", userid)
    const user = await User.findById(ObjectId(userid))
    user.password = undefined
    res.json({ success: true, friend: user })
  } catch (error) {
    console.log("error 5", error)
    res.json({ success: false })
  }
}
