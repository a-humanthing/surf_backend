const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const { userRegister, userLogin } = require("../controller/user/userAuth")
const { sendOtp, verifyOtp } = require("../controller/user/otpController")
const {
  sendProfileCardData,
  sendProfileData,
} = require("../controller/user/data")
const router = express.Router()

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"]

  if (typeof header !== "undefined") {
    const bearer = header.split(" ")
    const token = bearer[1]

    req.token = token
    next()
  } else {
    //If header is undefined return Forbidden (403)
    return res.status(403).json({ success: false })
  }
}

router.post("/registerotp", sendOtp)
router.post("/verifyotp", verifyOtp)
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/data", checkToken, sendProfileCardData)
router.get("/profile", checkToken, sendProfileData)
module.exports = router
