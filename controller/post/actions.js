const Post = require("../../model/Post")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.likePost = async (req, res, next) => {
  const userid = req.userid
  const { postid } = req.params
  try {
    const post = await Post.findById(ObjectId(postid))
    if (post.likes.includes(ObjectId(userid))) {
      await post.updateOne({ $pull: { likes: ObjectId(userid) } })
      console.log("liked", post)
      res.json({ success: true, liked: false })
    } else {
      await post.updateOne({ $push: { likes: ObjectId(userid) } })
      console.log(" disliked", post)
      res.json({ success: true, liked: true })
    }
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}
