const express = require("express")
const {
  userRegister,
  userLogin,
  checkuserExists,
  resetPassword,
} = require("../controller/user/userAuth")
const { sendOtp, verifyOtp } = require("../controller/user/otpController")
const {
  sendProfileCardData,
  sendProfileData,
  sendUserPosts,
  sendHomefeeds,
  sendUserData,
  followUser,
  unfollowUser,
} = require("../controller/user/data")
const { checkToken, verifyJwt, sendOtpToEmail } = require("../middleware")
const router = express.Router()

// const checkToken = (req, res, next) => {
//   const header = req.headers["authorization"]

//   if (typeof header !== "undefined") {
//     const bearer = header.split(" ")
//     const token = bearer[1]

//     req.token = token
//     next()
//   } else {
//     //If header is undefined return Forbidden (403)
//     return res.status(403).json({ success: false })
//   }
// }

router.post("/registerotp", sendOtp)
router.post("/verifyotp", verifyOtp)
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/data", checkToken, sendProfileCardData)
router.get("/profile", checkToken, sendProfileData)
router.get("/posts", checkToken, verifyJwt, sendUserPosts)
router.get("/homefeeds", checkToken, verifyJwt, sendHomefeeds)
router.get("/:username", checkToken, verifyJwt, sendUserData)
router.put("/follow/:id", checkToken, verifyJwt, followUser)
router.put("/unfollow/:id", checkToken, verifyJwt, unfollowUser)
router.post("/checkuser", checkuserExists, sendOtpToEmail)
router.put("/resetpassword", resetPassword)
module.exports = router
