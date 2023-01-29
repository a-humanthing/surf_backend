const jwt = require("jsonwebtoken")
module.exports.verifyJwtToken = async (req, res, next) => {
  const header = req.headers["authorization"]
  if (typeof header !== "undefined") {
    const bearer = header.split(" ")
    const token = bearer[1]
    console.log("jwt present")
    req.token = token
    jwt.verify(token, process.env.JWTSECRET, async (err, authorizedData) => {
      if (err) {
        console.log("jwt verification err ", err)
        return res.json({ success: false, invalidToken: true })
      } else {
        req.userid = authorizedData.id
        console.log("passed jwt")
        next()
      }
    })
  } else {
    console.log(
      "jwt no token header type undefined ",
      req.headers["authorization"]
    )
    return res.json({ success: false, invalidToken: true })
  }
}
