import Joi from "joi";

export const blogSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    content: Joi.string().max(200).required(),
    keywords: Joi.string().min(1).required()
    
})