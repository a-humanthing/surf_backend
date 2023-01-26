const { adminLogin } = require("../controller/admin/adminController")

const router = require("express").Router()
router.post("/login", adminLogin)
module.exports = router
