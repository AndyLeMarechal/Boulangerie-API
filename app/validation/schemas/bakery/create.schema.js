import Joi from "joi";

export default Joi.object({
    title: Joi.string().min(2).max(20).required(),
    description: Joi.string().min(2).required(),
    img: Joi.string().empty('').uri(),
    hourly: Joi.string().min(2),
    city: Joi.string().min(2),
    address: Joi.string().min(2),
    zip_code: Joi.string().min(2).required(),

    bakery_id: Joi.number().integer(),
    article_id: Joi.number().integer(),
})