const express = require("express")
const {
  addService,
  updateService,
} = require("../controller/service/serviceController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.post("/add", checkToken, verifyJwt, addService)
router.put("/update", checkToken, verifyJwt, updateService)

module.exports = router
