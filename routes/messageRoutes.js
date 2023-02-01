const express = require("express")
const {
  addMessage,
  sendMessageOfConversation,
  sendMsgNotificationData,
} = require("../controller/message/messageController")
const { checkToken, verifyJwt } = require("../middleware")
const { verifyJwtToken } = require("../middleware/authentication")
const router = express.Router()
const Conversation = require("../model/Conversation")

router.post("/", addMessage)
router.post("/notificationData", verifyJwtToken, sendMsgNotificationData)
router.get("/:conversationId", checkToken, verifyJwt, sendMessageOfConversation)
module.exports = router
