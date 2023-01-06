const Post = require("../../model/Post")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.viewPost = async (req, res, next) => {
  console.log("userid = ", req.userid)
  res.json({ success: true })
}

module.exports.createPost = async (req, res, next) => {
  const userid = req.userid
  const { caption, imgUrl, id } = req.body
  const post = await Post.create({
    caption,
    image: imgUrl,
    userId: ObjectId(id),
  })
  post.save()
  const user = await User.updateOne(
    { _id: ObjectId(userid) },
    { $addToSet: { posts: post._id } }
  )
  res.json({ success: true, post })
}

module.exports.updatePost = async (req, res, next) => {}

module.exports.deletePost = async (req, res, next) => {}
