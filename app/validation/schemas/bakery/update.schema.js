import Joi from "joi";

export default Joi.object({
    title: Joi.string().min(2).max(20),
    description: Joi.string().min(2),
    img: Joi.string().empty('').uri(),
    hourly: Joi.string().min(2),
    city: Joi.string().min(2),
    address: Joi.string().min(2),
    zip_code: Joi.string().min(2),

    bakery_id: Joi.number().integer(),
    article_id: Joi.number().integer(),
}).min(1).required();