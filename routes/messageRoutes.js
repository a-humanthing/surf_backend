const express = require("express")
const {
  addMessage,
  sendMessageOfConversation,
} = require("../controller/message/messageController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()
const Conversation = require("../model/Conversation")

router.post("/", addMessage)
router.get("/:conversationId", checkToken, verifyJwt, sendMessageOfConversation)
module.exports = router
