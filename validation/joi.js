const Joi = require("joi")

module.exports.serviceSchema = Joi.object({
  serviceType: Joi.string()
    .pattern(/^[a-zA-Z]*$/)
    .required(),
  serviceName: Joi.string()
    .pattern(/^[a-zA-Z ]*$/)
    .required(),
  description: Joi.string()
    .pattern(/^[a-zA-Z ]*$/)
    .required(),
  location: Joi.string(),
  userId: Joi.string().hex().length(24),
  stars: Joi.any().optional(),

  range: Joi.number().min(1).max(7),
})
