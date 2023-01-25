const express = require("express")
const {
  addStory,
  sendStories,
  updateStoryView,
  deleteStory,
} = require("../controller/story/storyController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.post("/create", checkToken, verifyJwt, addStory)
router.get("/fetch", checkToken, verifyJwt, sendStories)
router.put("/views", checkToken, verifyJwt, updateStoryView)
router.delete("/:storyId", checkToken, verifyJwt, deleteStory)

module.exports = router
