const Post = require("../../model/Post")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.viewPost = async (req, res, next) => {
  console.log("userid = ", req.userid)
  res.json({ success: true })
}

module.exports.createPost = async (req, res, next) => {
  const userid = req.userid
  const { caption, imgUrl, fileType } = req.body
  const post = await Post.create({
    caption,
    image: imgUrl,
    userId: ObjectId(userid),
    postType: fileType,
  })
  post.save()
  const user = await User.updateOne(
    { _id: ObjectId(userid) },
    { $addToSet: { posts: post._id } }
  )
  res.json({ success: true, post })
}

module.exports.updatePost = async (req, res, next) => {
  try {
    const postid = req.params
    const { newCaption } = req.body
    console.log("postid -", postid)
    const updatePost = await Post.findByIdAndUpdate(postid.postid, {
      caption: newCaption,
    })
    console.log("updated post,", updatePost)
    res.json({ success: true })
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}

module.exports.deletePost = async (req, res, next) => {
  try {
    const postid = req.params
    const userid = req.userid
    console.log("postid-", postid)
    const delpost = await Post.findByIdAndDelete(ObjectId(postid.postid))
    const userCollection = await User.findById(ObjectId(userid))
    console.log("user", userCollection)
    const pullItem = await userCollection.updateOne({
      $pull: { posts: ObjectId(postid.postid) },
    })
    console.log("del-", userCollection, "---", pullItem)
    res.json({ success: true })
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}
