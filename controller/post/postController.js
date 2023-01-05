const Post = require("../../model/Post")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.viewPost = async (req, res, next) => {
  console.log("userid = ", req.userid)
  res.json({ success: true })
}

module.exports.createPost = async (req, res, next) => {
  const userid = req.userid
  const { caption, imgUrl } = req.body
  const post = await Post.create({ caption, image: imgUrl })
  post.save()
  const user = await User.updateOne(
    { _id: ObjectId(userid) },
    { $addToSet: { posts: post._id } }
  )
  const user1 = await User.findById(userid)
  const user2 = await User.findById(ObjectId(userid))
  console.log("user1= ", user1)
  console.log("user2= ", user2)
  console.log("oid = ", ObjectId(userid))
  console.log("id = ", userid)
  console.log("post = ", post)
  console.log("user with post ", user)
  res.json({ success: true, post })
}

module.exports.updatePost = async (req, res, next) => {}

module.exports.deletePost = async (req, res, next) => {}
