const Service = require("../../model/Service")
const User = require("../../model/User")
const { ObjectId } = require("../../util")

module.exports.addService = async (req, res, next) => {
  const userid = req.userid
  const { serviceType, serviceName, description, location, range } = req.body
  try {
    const addService = await Service.create({
      serviceType,
      serviceName,
      description,
      location,
      range,
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
    const updateService = await Service.findByIdAndUpdate(ObjectId(userid), {
      ...req.body,
    })

    //here was the error have to send the service id or find inner data frm user
    console.log("updated ", updateService)
    res.json({ success: true })
  } catch (error) {
    console.log("async err= ", error)
  }
}
