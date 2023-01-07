const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
dotenv.config()
const User = require("../../model/User")

module.exports.verifyOtp = async (req, res, next) => {
  try {
    console.log(req.body)
  } catch (error) {
    console.log("Otp Verification error ", error)
  }
}

module.exports.userRegister = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password, fullName, userName } = req.body
    const emailExists = await User.findOne({ email })
    const userNameExists = await User.findOne({ userName })
    if (emailExists) {
      return res.status(401).json({ success: false, email: false })
    } else if (userNameExists) {
      return res.status(401).json({ success: false, userName: false })
    } else {
      //password hashing
      const hashedPass = await bcrypt.hash(password, 10)
      //save user to DB
      const user = await User.create({
        email: email,
        userName: userName,
        password: hashedPass,
        fullName: fullName,
      })
      await user.save()
      //generate a token for user and send it
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        `${process.env.JWTSECRET}`, //process.env.jwtsecret
        { expiresIn: "24h" }
      )

      user.token = token
      user.password = undefined
      return res.status(200).json({ user, token })
    }
  } catch (error) {
    console.log("register error = ", error)
    res.status(401).json({ success: false })
  }
}

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    //match password

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        `${process.env.JWTSECRET}`, //proece.env.jwtsecret
        { expiresIn: "24h" }
      )
      user.token = token
      user.password = undefined

      //send token in user cookie
      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        id: user._id,
        username: user.userName,
      })
    } else {
      return res.status(401).json({ success: false })
    }
  } catch (error) {
    console.log(error)
  }
}
