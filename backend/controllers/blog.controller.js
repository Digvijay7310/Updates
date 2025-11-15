import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { blogSchema } from "../validator/blog.validator.js";

export const createBlog= AsyncHandler(async(req, res) => {
    const {error} = blogSchema.validate(req.body)
    if(error){
        throw new ApiError(409, error.details[0].message)
    }
    const {title, content, description, keywords} = req.body;
    if(!title || !content || !description) {
        throw new ApiError(400, "Title description and content are required")
    }
    let images = [];
    if(req.files){
        for(const files of req.files){
            const uploaded = await uploadOnCloudinary(files.path);
            if(uploaded?.secure_url) images.push(uploaded.secure_url)
        }
    }

    const blog = await Blog.create({
        title,
        description, 
        content,
        keywords: keywords ? keywords.split(",") : ["others"],
        images,
        author: req.user._id,
    })
    res.status(201)
    .json(new ApiResponse(201, blog, "Blog created successfull"))
})

export const getAllBlogs = AsyncHandler(async(req, res) => {
    const blogs = await Blog.find().sort({createdAt: -1}).populate("author", "avatar fullName email")
    res.status(200).json(new ApiResponse(200, blogs, "All Blogs fetched"))
})

export const getBlogById = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("author", "fullName avatar email")
    if(!blog) throw new ApiError(404, "Blog not found")
        res.status(200).json(new ApiResponse(200, blog, "Blog fetched"))
})

export const updateBlog = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }
    
    // Only admin and author can update blog
    if(blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin"){
        throw new ApiError(403, "Unauthorized: Only the author or admin can update")
    }

    const {title, content, description, keywords} = req.body
    if(!title !== undefined) blog.title = title
    if(!content !== undefined) blog.content = content
    if(!description !== undefined) blog.description = description
    if(!keywords !== undefined) blog.keywords = keywords

    if(req.files){
        const uploadedImages = []
        for(const file of req.files){
            const uploaded = await uploadOnCloudinary(file.path)
            if(uploaded?.secure_url) uploadedImages.push(uploaded.secure_url)
        }
    blog.images = [...blog.images, ...uploadedImages];
    }
    await blog.save()
    res.status(200).json(new ApiResponse(200, blog, "Blog updated successfull"))
})

export const deleteBlog = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }
    // Only author or admin can delete
    if(blog.author.toString() !== req.user.id.toString() && req.user.role !== 'admin'){
        throw new ApiError(403, "Unauthorixed: Only the author or admin can delete this blog")
    }
    await blog.deleteOne();
    res.status(200).json(new ApiResponse(200, {}, "Blog deleted"))
})

export const searchBlogs = AsyncHandler(async(req, res) => {
    const {q, limit = 50, skip = 0} = req.query;

    if(!q || q.trim() === ""){
        throw new ApiError(400, "Search query is required")
    }
    const searchRegex = new RegExp(q.trim(), 'i')

    const blogs = await blog.find({
        $or: [
            {title: searchBlogs},
            {content: searchRegex},
            {description: searchRegex},
            {keywords: searchRegex},
        ],
    })
    .sort({createdAt: -1})
    .skip(Number(skip))
    .limit(Number(limit))
    .populate("author", "fullName email avatar");

    const totalResults = await Blog.countDocuments({
        $or: [
            {title: searchRegex},
            {content: searchRegex},
            {description: searchRegex},
            {keywords: searchRegex},
        ],
    })
    res.status(200).json(
        new ApiResponse(200, {totalResults, count: blogs.length, blogs}, "Search results fetched successfully")
    )
})

