const Story = require("../../model/Story")
const { ObjectId } = require("../../util")

module.exports.addStory = async (req, res, next) => {
  const userId = req.userid
  const { imgUrl, caption } = req.body
  const story = Story({ userId, image: imgUrl, caption })
  const save = await story.save()
  res.status(200).json({ success: true, data: save })
}
module.exports.sendStories = async (req, res, next) => {
  try {
    const stories = await Story.find({})
      .populate("userId")
      .sort({ createdAt: -1 })
    stories.forEach((item) => {
      item.userId.password = undefined
    })
    console.log("stories", stories)
    res.status(200).json({ success: true, stories })
  } catch (error) {
    console.log("add story error", error)
    return res.status(500).json({ success: false })
  }
}

module.exports.updateStoryView = async (req, res, next) => {
  try {
    const { storyId } = req.body
    const userId = req.userid
    const story = await Story.findById(ObjectId(storyId))
    console.log("story", story)
    if (!story.views.includes(ObjectId(userId))) {
      await story.updateOne({ $push: { views: ObjectId(userId) } })
    }
    console.log("story after updatation-", story)
    res.json({ success: true, viewed: true })
  } catch (error) {
    console.log("update view error", error)
    return res.status(500).json({ success: false })
  }
}

module.exports.deleteStory = async (req, res, next) => {
  try {
    const { storyId } = req.params
    console.log("storyid", storyId)
    const response = await Story.findByIdAndDelete(ObjectId(storyId))
    console.log("del res-", response)
    if (response) {
      return res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (error) {
    console.log("del story erro", error)
    return res.json({ success: false })
  }
}
