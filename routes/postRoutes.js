const express = require("express")
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

module.exports = router
