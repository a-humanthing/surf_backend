const Service = require("../../model/Service")
const Servicename = require("../../model/Servicename")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.addService = async (req, res, next) => {
  const userid = req.userid
  const { serviceType, serviceName, description, location, range } = req.body
  try {
    const serviceNameResponse = await Servicename.findOneAndUpdate(
      { serviceName: serviceName },
      { updated: true },
      { upsert: true }
    )
    const addService = await Service.create({
      serviceType,
      serviceName,
      description,
      location,
      range,
      userId: userid,
    })
    addService.save()
    const user = await User.updateOne(
      { _id: ObjectId(userid) },
      { $push: { services: ObjectId(addService._id) } }
    )
    const userfound = await User.findById(ObjectId(userid))
    res.json({ success: true })
  } catch (error) {
    console.log("async error", error)
    res.json({ success: false })
  }
}

module.exports.updateService = async (req, res, next) => {
  try {
    const userid = req.userid
    const { serviceId } = req.params
    console.log("ser id")
    const updateService = await Service.findByIdAndUpdate(ObjectId(serviceId), {
      ...req.body,
    })

    //here was the error have to send the service id or find inner data frm user
    console.log("updated ", updateService)
    res.json({ success: true })
  } catch (error) {
    console.log("async err= ", error)
    res.json({ success: false })
  }
}

module.exports.sendServices = async (req, res, next) => {
  try {
    const userid = req.userid
    const services = await Service.find({}).populate("userId")
    res.json({ success: true, services })
  } catch (error) {
    console.log("async err = ", error)
    res.json({ success: false })
  }
}

module.exports.sendServiceName = async (req, res, next) => {
  try {
    const userid = req.userid
    const serviceNameList = await Servicename.find({})
    res.json({ success: true, serviceNameList })
  } catch (error) {
    console.log("async error in fetching service name", error)
    res.json({ success: false })
  }
}

module.exports.sendServiceByLocation = async (req, res, next) => {
  try {
    const { location } = req.params
    const response = await Service.find({ location })
    res.json({ success: true, services: response })
  } catch (error) {
    console.log("async error in fetching service name", error)
    res.json({ success: false })
  }
}
