const express = require("express")
const {
  likePost,
  postComment,
  sendCommnets,
  deleteComment,
} = require("../controller/post/actions")
const {
  viewPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/post/postController")
const { checkToken, verifyJwt } = require("../middleware")
const { verifyJwtToken } = require("../middleware/authentication")

const router = express.Router()

router.get("/view", checkToken, verifyJwt, viewPost)
router.post("/create", checkToken, verifyJwt, createPost)
router.delete("/:postid", checkToken, verifyJwt, deletePost)
router.put("/:postid", checkToken, verifyJwt, updatePost)
router.put("/like/:postid", checkToken, verifyJwt, likePost)
router.post("/comment/:postid", checkToken, verifyJwt, postComment)
router.get("/comment/:postid", checkToken, verifyJwt, sendCommnets)
router.delete("/comment/:postId/:commentId", verifyJwtToken, deleteComment)

module.exports = router
