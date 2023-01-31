const express = require("express")
const {
  userRegister,
  userLogin,
  checkuserExists,
  resetPassword,
  updateProfile,
} = require("../controller/user/userAuth")
const { sendOtp, verifyOtp } = require("../controller/user/otpController")
const {
  sendProfileCardData,
  sendProfileData,
  sendUserPosts,
  sendHomefeeds,
  sendUserData,
  sendUserById,
} = require("../controller/user/data")
const { checkToken, verifyJwt, sendOtpToEmail } = require("../middleware")
const { sendSearchResults } = require("../controller/user/search")
const { sendNotifications } = require("../controller/user/notification")
const {
  blockUser,
  unBlockUser,
  followUser,
  unfollowUser,
} = require("../controller/user/actions")
const router = express.Router()

router.post("/registerotp", sendOtp)
router.post("/verifyotp", verifyOtp)
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/data", checkToken, sendProfileCardData)
router.get("/profile", checkToken, sendProfileData)
router.put("/profile", checkToken, verifyJwt, updateProfile)
router.get("/posts", checkToken, verifyJwt, sendUserPosts)
router.get("/homefeeds", checkToken, verifyJwt, sendHomefeeds)
router.get("/notifications", checkToken, verifyJwt, sendNotifications)
router.get("/:username", checkToken, verifyJwt, sendUserData)
router.get("/id/:userid", checkToken, verifyJwt, sendUserById)
router.put("/follow/:id", checkToken, verifyJwt, followUser)
router.put("/unfollow/:id", checkToken, verifyJwt, unfollowUser)
router.put("/block/:id", checkToken, verifyJwt, blockUser)
router.put("/unblock/:id", checkToken, verifyJwt, unBlockUser)

router.get("/search/:keyword", checkToken, verifyJwt, sendSearchResults)
router.post("/checkuser", checkuserExists, sendOtpToEmail)
router.put("/resetpassword", resetPassword)

module.exports = router
