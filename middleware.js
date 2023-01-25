const jwt = require("jsonwebtoken")
const Otp = require("./model/Otp")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAIILERHOST,
  port: 587,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
})

module.exports.verifyJwt = (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification err ", err)
      return res.json({ success: false, invalidToken: true })
    } else {
      req.userid = authorizedData.id
      console.log("passed jwt")
      next()
    }
  })
}

module.exports.checkToken = (req, res, next) => {
  const header = req.headers["authorization"]

  if (typeof header !== "undefined") {
    const bearer = header.split(" ")
    const token = bearer[1]
    console.log("passed check")
    req.token = token
    next()
  } else {
    console.log("type head", typeof header)
    //If header is undefined return Forbidden (403)
    console.log("error in check token")
    return res.status(403).json({ success: false })
  }
}

module.exports.sendOtpToEmail = async (req, res, next) => {
  const { email } = req.body
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
    .catch((e) => console.log("err", e))
  await transporter.sendMail(mailOptions)
  console.log("email has sent")
  res.json({ success: true })
}
