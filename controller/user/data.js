const jwt = require("jsonwebtoken")
const User = require("../../model/User")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

module.exports.sendProfileCardData = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification error = ", err)
      res.status(403).json({ success: false })
    } else {
      const id = authorizedData.id
      //   const user = await User.findById(id)
      const data = await User.aggregate([
        { $match: { _id: ObjectId(id) } },
        { $project: { fullName: 1, userName: 1, profilePic: 1 } },
      ])
      console.log(data)
      const user = data[0]

      res.status(200).json({ success: true, user })
    }
  })
}

module.exports.sendProfileData = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification error = ", err)
      res.status(403).json({ success: false })
    } else {
      const id = authorizedData.id
      const data = await User.findById(id)
      data.password = undefined
      res.status(200).json({ success: true, data })
    }
  })
}
