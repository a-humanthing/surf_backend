const Conversation = require("../../model/Conversation")
const Message = require("../../model/Message")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.addMessage = async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body)
    const message = await newMessage.save()
    res.status(200).json({ success: true, message })
  } catch (error) {
    console.log("error 3 ", error)
    res.status(500).json({ success: false })
  }
}

module.exports.sendMessageOfConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params
    const messages = await Message.find({
      conversationId: conversationId,
    })
    const currentChat = await Conversation.findById(conversationId)
    // const friendData = await Conversation.aggregate([
    //   { $match: { _id: ObjectId(conversationId) } },
    //   { $unwind: "$members" },{$match:{$}},{$project:{}}
    // ])
    // console.log("friedata - ", friendData)
    res.status(200).json({ success: true, messages, currentChat })
  } catch (error) {
    console.log("error 4 ", error)
    res.status(500).json({ success: false })
  }
}

module.exports.sendMsgNotificationData = async (req, res, next) => {
  try {
    const { messagedUsers } = req.body
    console.log("msgusers", messagedUsers)
    const data = await User.find({ _id: { $in: messagedUsers } })
    const receivedMsgFrom = data.map((user) => {
      return {
        _id: user._id,
        username: user.userName,
      }
    })
    console.log("msg users,", data)
    if (data.length > 0) {
      res.json({ success: true, receivedMsgFrom })
    } else {
      res.json({ success: false })
    }
  } catch (error) {
    console.log("msg noti err", error)
    res.json({ success: false })
  }
}
