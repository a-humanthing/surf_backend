const express = require("express")
const {
  addService,
  updateService,
  sendServices,
  sendServiceName,
  sendServiceByLocation,
  starService,
} = require("../controller/service/serviceController")
const { checkToken, verifyJwt } = require("../middleware")
const { verifyJwtToken } = require("../middleware/authentication")
const { serviceJoiValidation } = require("../middleware/validation")
const router = express.Router()

router.get("/", checkToken, verifyJwt, sendServices)
router.post("/add", verifyJwtToken, addService)
router.put("/:serviceId", checkToken, verifyJwt, updateService)
router.put("/star/:serviceId", checkToken, verifyJwt, starService)
router.get("/names", checkToken, verifyJwt, sendServiceName)
router.get("/in/:location", checkToken, verifyJwt, sendServiceByLocation)

module.exports = router
