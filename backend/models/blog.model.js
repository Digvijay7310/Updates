import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        min: 3,
        maxLength: 150,
        required: true,
    },
    description: {
        type: String,
        min: 3,
        maxLength: 200,
        required: true,
    },
    content: {
        type: String,
        min: 200,
        required: true,
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    keywords: {
        type: [String],
        default: ["others"],
    },
    images: [
        {type: String},
    ],
}, {timestamps: true})

BlogSchema.index({title: 'text', description:'text', keywords: 'text'})

export const Blog = mongoose.model("Blog", BlogSchema)