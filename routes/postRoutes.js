const express = require("express")
const {
  likePost,
  postComment,
  sendCommnets,
} = require("../controller/post/actions")
const {
  viewPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/post/postController")
const { checkToken, verifyJwt } = require("../middleware")

const router = express.Router()

router.get("/view", checkToken, verifyJwt, viewPost)
router.post("/create", checkToken, verifyJwt, createPost)
router.put("/update", checkToken, verifyJwt, updatePost)
router.delete("/delete", checkToken, verifyJwt, deletePost)
router.put("/like/:postid", checkToken, verifyJwt, likePost)
router.post("/comment/:postid", checkToken, verifyJwt, postComment)
router.get("/comment/:postid", checkToken, verifyJwt, sendCommnets)

module.exports = router
