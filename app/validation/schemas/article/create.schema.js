import Joi from "joi";

export default Joi.object({
    type: Joi.string().min(2).max(20).required(),
    title: Joi.string().min(2).max(20).required(),
    description: Joi.string().min(2).required(),
    img: Joi.string().empty('').uri(),
    price: Joi.number().required(),
    method_of_conservation: Joi.string().min(2).required(),
    composition: Joi.string().min(2).required(),
    nutritional_values: Joi.string().min(2).required(),
    allergens: Joi.string().min(2).required(),

    user_id: Joi.number().integer().required(),
})




