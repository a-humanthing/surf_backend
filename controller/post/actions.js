const Comment = require("../../model/Comment")
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

module.exports.postComment = async (req, res, next) => {
  try {
    const userid = req.userid
    const { postid } = req.params
    const { comment } = req.body
    const addcomment = await Comment.create({
      text: comment,
      userId: userid,
      postId: postid,
    })
    addcomment.save(function (err, result) {
      if (err) {
        console.log(err)
        return res.json({ success: false })
      } else {
        console.log(result)
        return res.json({ success: true })
      }
    })
    const addToPost = await Post.findByIdAndUpdate(ObjectId(postid), {
      $push: { comments: ObjectId(addcomment._id) },
    })
  } catch (error) {
    console.log("asyn e")
    res.json({ success: false })
  }
}

module.exports.sendCommnets = async (req, res, next) => {
  try {
    const userid = req.userid
    const { postid } = req.params
    const allComments = await Post.findById(postid).populate({
      path: "comments",
      populate: { path: "userId" },
    })
    allComments.comments[0].userId.password = undefined
    console.log("all comments= ", allComments.comments[0].userId.password)
    res.json({ success: true, comments: allComments })
  } catch (error) {
    console.log("async error sending comments", error)
    res.json({ success: false })
  }
}
