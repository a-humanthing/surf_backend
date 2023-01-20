const User = require("../../model/User")

module.exports.sendSearchResults = async (req, res, next) => {
  const { keyword } = req.params
  const result = await User.find({ userName: new RegExp(keyword, "i") }).limit(
    4
  )
  console.log("results-", result)
  res.json({ success: true, result })
}
