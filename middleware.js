const jwt = require("jsonwebtoken")

module.exports.verifyJwt = (req, res, next) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authorizedData) => {
    if (err) {
      console.log("jwt verification err ", err)
      return res.json({ success: false })
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
