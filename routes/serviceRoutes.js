const express = require("express")
const {
  addService,
  updateService,
  sendServices,
  sendServiceName,
} = require("../controller/service/serviceController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.get("/", checkToken, verifyJwt, sendServices)
router.post("/add", checkToken, verifyJwt, addService)
router.put("/:serviceId", checkToken, verifyJwt, updateService)
router.get("/names", checkToken, verifyJwt, sendServiceName)

module.exports = router
