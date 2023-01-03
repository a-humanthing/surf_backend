if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const Otp = require("../../model/Otp")
const User = require("../../model/User")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require("uuid")

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAIILERHOST,
  port: 587,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
})

module.exports.sendOtp = async (req, res, next) => {
  const { email } = req.body
  const checkEmail = await User.findOne({ email: email })
  if (checkEmail !== null) return res.json({ success: false })
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`
  const mailOptions = {
    from: "torrey15@ethereal.email",
    to: email,
    subject: "Verify Your Email",
    html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete Verification</p>`,
  }
  const saltRounds = 10
  const hashedOTP = await bcrypt.hash(otp, saltRounds)
  const newOtpVerification = new Otp({
    email: email,
    otp: hashedOTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + 120000,
  })
  await newOtpVerification
    .save()
    .then(() => console.log("saved"))
    .catch((e) => console.log("err", err))
  await transporter.sendMail(mailOptions)
  console.log("email has sent")
  res.json({ success: true })
}

module.exports.verifyOtp = async (req, res, next) => {
  const { otp, email } = req.body
  const otpdata = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
  const hashedOTP = otpdata.otp
  bcrypt.compare(otp, hashedOTP, (err, result) => {
    if (result) {
      return res.json({ otpVerified: true })
    } else {
      return res.json({ otpVerified: false })
    }
  })
}

// module.exports.otpLogin = async (req, res, next) => {
//   const { email } = req.body
//   const user = await User.findOne({ email: `${email}` })
//   if (user !== null) {
//     const data = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
//     //console.log(data);
//     const otp = data.otp
//     res.render("users/otpComp", { otp, email })
//   } else {
//     req.flash("error", "not a valid email")
//     return res.redirect("/user/login")
//   }
// }

// module.exports.validateOtp = async (req, res, next) => {
//   const { email, otp } = req.body
//   const data = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
//   const user = await User.findOne({ email })
//   const hashOtp = data.otp
//   bcrypt.compare(otp, hashOtp, (err, result) => {
//     if (result) {
//       req.session.otpVerified = true
//       res.locals.UserId = user._id
//       req.session.user = user._id
//       req.session.username = user.username
//       return res.redirect("/user/home")
//     } else {
//       req.flash("error", "otp validation failed")
//       res.redirect("/user/login")
//     }
//   })
// }
