const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const { userRegister } = require("../controller/user/userAuth")
const { sendOtp, verifyOtp } = require("../controller/user/otpController")
const router = express.Router()

router.post("/registerotp", sendOtp)
router.post("/verifyotp", verifyOtp)
router.post("/register", userRegister)
router.get("/register", (req, res) => {
  res.json({ status: "reached" })
})
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = await User.findOne({ email, password })
  res.json({ email, password })
})
module.exports = router
