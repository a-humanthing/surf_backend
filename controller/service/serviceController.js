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
    const updateService = await Service.findByIdAndUpdate(ObjectId(serviceId), {
      ...req.body,
    })

    //here was the error have to send the service id or find inner data frm user
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

module.exports.starService = async (req, res, next) => {
  try {
    const userid = req.userid
    const { serviceId } = req.params
    const service = await Service.findById(ObjectId(serviceId)).populate(
      "userId"
    )
    const followersCount = await service.userId.followers.length
    let starCount = await service.stars.length
    let rating = starCount / followersCount
    console.log("ser-", service)
    if (service.stars.includes(ObjectId(userid))) {
      await service.updateOne({ $pull: { stars: ObjectId(userid) } })
      console.log("starred")
      rating = Math.ceil((starCount - 1 / followersCount) * 10)
      console.log("rating-", rating)
      return res.json({ success: true, starred: false, rating })
    } else {
      await service.updateOne({ $push: { stars: ObjectId(userid) } })
      console.log("unstarred", service)
      rating = Math.ceil((starCount + 1 / followersCount) * 10)
      console.log("rating-", rating, "star=", starCount)
      return res.json({ success: true, starred: true, rating })
    }
  } catch (error) {
    console.log("async error in star add", error)
    res.json({ success: false })
  }
}
