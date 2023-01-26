module.exports.adminLogin = async (req, res, next) => {
  try {
    const { adminPass, adminName } = req.body
    if (adminName === "surfer" && adminPass === "1234") {
      return res.json({ success: true, adminName })
    } else {
      return res.json({ success: false })
    }
  } catch (error) {
    console.log("erro admin login", error)
    res.json({ success: false })
  }
}
