import Joi from "joi";

export default Joi.object({
    "bakery_id": Joi.number().integer().required(),
    "article_id": Joi.number().integer().required(),
});