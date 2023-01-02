const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../model/User")
const { userRegister } = require("../controller/user/userAuth")
const router = express.Router()

router.post("/register", userRegister)
router.get("/register", (req, res) => {
  res.send("reached")
})
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = await User.findOne({ email, password })
  res.json({ email, password })
})
module.exports = router
