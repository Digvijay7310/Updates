import Joi from "joi";

export const blogSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    content: Joi.string().min(200).required(),
    
})