const {
  adminLogin,
  sendUserList,
  terminateUser,
} = require("../controller/admin/adminController")

const router = require("express").Router()
router.post("/login", adminLogin)
router.get("/userlist", sendUserList)
router.put("/terminate/:userId", terminateUser)
module.exports = router
