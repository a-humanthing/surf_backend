const express = require("express")
const {
  addConversation,
  sendUserConversations,
} = require("../controller/conversation/conversationController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.post("/", checkToken, verifyJwt, addConversation)
router.get("/:userId", checkToken, verifyJwt, sendUserConversations)

module.exports = router
