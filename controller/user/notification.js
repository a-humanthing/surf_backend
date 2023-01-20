const Post = require("../../model/Post")
const User = require("../../model/User")

module.exports.sendNotifications = async (req, res, next) => {
  try {
    const userid = req.userid
    const response = await User.findById(userid)
    const friends = response.following
    const unFIlteredlatestPosts = await Post.find({
      userId: { $in: [...friends] },
      createdAt: {
        $gt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
    }).populate("userId")
    const latestPosts = unFIlteredlatestPosts.map((item) => ({
      user: item.userId.userName,
      image: item.image,
      createdAt: item.createdAt,
    }))
    console.log("friends-", latestPosts)
    res.json({ success: true, notification: latestPosts })
  } catch (error) {
    console.log("async error in notification", error)
  }
}

// {
//     $lookup: {
//       from: "User",
//       localField: "userId",
//       foreignField: "_id",
//       as: "userData",
//     },
//   },

//notification through aggragation

// const latestPosts = await Post.aggregate([
//     {
//       $match: {
//         userId: { $in: [...friends] },
//         createdAt: {
//           $gt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
//         },
//       },
//     },
//     {$project:{
//       userId:1,
//       caption:1,

//     }}
//   ])
