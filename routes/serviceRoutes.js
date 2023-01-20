const express = require("express")
const {
  addService,
  updateService,
  sendServices,
  sendServiceName,
  sendServiceByLocation,
} = require("../controller/service/serviceController")
const { checkToken, verifyJwt } = require("../middleware")
const router = express.Router()

router.get("/", checkToken, verifyJwt, sendServices)
router.post("/add", checkToken, verifyJwt, addService)
router.put("/:serviceId", checkToken, verifyJwt, updateService)
router.get("/names", checkToken, verifyJwt, sendServiceName)
router.get("/in/:location", checkToken, verifyJwt, sendServiceByLocation)

module.exports = router
