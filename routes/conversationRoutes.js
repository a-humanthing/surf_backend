const express = require("express")
const {
  addConversation,
  sendUserConversations,
  findConversation,
} = require("../controller/conversation/conversationController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.post("/", checkToken, verifyJwt, addConversation)
router.get(
  "/find/:firstUserId/:secondUserId",
  checkToken,
  verifyJwt,
  findConversation
)
router.get("/:userId", checkToken, verifyJwt, sendUserConversations)

module.exports = router
