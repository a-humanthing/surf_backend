const Conversation = require("../../model/Conversation")

module.exports.addConversation = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    })
    const savedConversation = await newConversation.save()
    res.status(200).json({ success: true, savedConversation })
  } catch (error) {
    console.log("error ", error)
    res.status(500).json({ success: false })
  }
}

module.exports.sendUserConversations = async (req, res, next) => {
  try {
    const { userId } = req.params
    const conversation = await Conversation.find({ members: { $in: [userId] } })
    res.json({ success: true, conversation })
  } catch (error) {
    console.log("error 2 ", error)
    res.status(500).json({ success: false })
  }
}
