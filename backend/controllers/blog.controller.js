import {Blog} from "../models/blog.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

// create Blog (user and admin)
const createBlog = AsyncHandler(async(req, res)=> {
    const {title, content} = req.body;
    const user = req.user;

    if(!title || !content) throw new ApiError(400, "Title and content is required")

        let images = [];
        if(req.files){
            for(const file of req.files){
                const result = await uploadOnCloudinary(file.path);
                if(result?.secure_url){
                    images.push(result.secure_url);
                }
            }
        }

        const blog = await Blog.create({
            title,
            content,
            images,
            author: user._id,
            authorModel: user.role || "User"
        })

        return  res.status(201).json(
            new ApiResponse(201, blog, "Blog created successfully")
        );
});

// Get all blogs 
const getAllBlogs = AsyncHandler(async (req, res)=> {
    const blogs = await Blog.find({isPublished: true}).sort({createdAt: -1}).populate("author", "fullName username avatar");

    return res.status(200).json(
        new ApiResponse(200, blogs, "All blogs fetched")
    )
});

// Get an blog
const getBlogById = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("author", "fullName username avatar");
    
    if(!blog) throw new ApiError(404, "Blog not found");

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog fetched")
    )
})

// Update blog (owner only)
const updateBlog = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog) throw new ApiError(404, "Blog not found");

    if(
        !blog.author.equals(req.user._id) || 
        blog.authorModel !== req.userModel
     ) {
        throw new ApiError(403, "Unauthorized: You are not the owner of this blog");
     }

    const {title, content, isPublished} = req.body;

    let removeImages = req.body.removeImages || [];
    if(typeof removeImages === "string"){
        removeImages = [removeImages];
    }

    if(title !== undefined) blog.title = title;
    if(content !== undefined) blog.content = content;
    if(isPublished !== undefined){
         blog.isPublished = isPublished === "true" || isPublished === true;
        }

    await blog.save()

    return res.status(200).json(
        new ApiResponse(200, blog, "Blog updated")
    )


})

// Delete an blog
const deleteBlog = AsyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog) throw new ApiError(404, "Blog not found");

    // If admin, allow delete
    if(req.userModel === "Admin"){
        await blog.deleteOne()
        return res.status(200).json(
            new ApiResponse(200 ,{}, "Blog deleted by admin")
        )
    }

    // If user, allow only if owner

    if(String(blog.author) !== req.user._id.toString() ||
     blog.authorModel !== req.userModel
    ){
        throw new ApiError(403, "Unauthorized");
    }

    await blog.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, {}, "Blog deleted")
    )
})


export {createBlog, getAllBlogs, updateBlog,
 deleteBlog, getBlogById}