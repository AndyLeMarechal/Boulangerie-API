import Joi from "joi";

export default Joi.object({
    "bakery_id": Joi.number().integer(),
    "article_id": Joi.number().integer(),
}).min(1).required();