import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150,
    },
    content: {
        type: String,
        required: true,
        maxLength: 5000,
    },
    images: [{
        type: String,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'authorModel',
        required: true,
    },
    authorModel: {
        type: String,
        required: true,
        enum: ["Admin", "User"]
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})


const Blog = mongoose.model("Blog", blogSchema)
export {Blog}