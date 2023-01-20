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

module.exports.findConversation = async (req, res, next) => {
  try {
    const { firstUserId, secondUserId } = req.params
    let conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    })
    if (!conversation) {
      let addConv = new Conversation({ members: [firstUserId, secondUserId] })
      conversation = await addConv.save()
    }
    res.json({ success: true, conversation })
  } catch (error) {
    console.log("error find conv ", error)
    res.status(500).json({ success: false })
  }
}

module.exports.sendConversationById = async (req, res, next) => {
  try {
    const { conversationId } = req.params
    const conversation = await Conversation.findById(conversationId)
    res.json({ success: true, conversation })
  } catch (error) {
    console.log("error on send conv by id", error)
    res.status(500).json({ success: false })
  }
}
