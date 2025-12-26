import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { blogSchema } from "../validator/blog.validator.js";

/* ===========================
   CREATE BLOG
=========================== */
export const createBlog = AsyncHandler(async (req, res) => {
  const { error } = blogSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { title, description, content, keywords } = req.body;

  let images = [];
  if (req.files?.length) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded?.secure_url) images.push(uploaded.secure_url);
    }
  }

  const blog = await Blog.create({
    title,
    description,
    content,
    keywords: keywords ? keywords.split(",") : ["others"],
    images,
    author: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog created successfully"));
});

/* ===========================
   GET ALL BLOGS
=========================== */
export const getAllBlogs = AsyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .populate("author", "fullName email avatar");

  res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

/* ===========================
   GET BLOG BY ID
=========================== */
export const getBlogById = AsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("author", "fullName email avatar");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

/* ===========================
   UPDATE BLOG
=========================== */
export const updateBlog = AsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // Authorization: author or admin
  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Unauthorized to update this blog");
  }

  const { title, description, content, keywords } = req.body;

  if (title !== undefined) blog.title = title;
  if (description !== undefined) blog.description = description;
  if (content !== undefined) blog.content = content;
  if (keywords !== undefined) blog.keywords = keywords.split(",");

  // Upload new images
  if (req.files?.length) {
    const uploadedImages = [];
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded?.secure_url) uploadedImages.push(uploaded.secure_url);
    }
    blog.images.push(...uploadedImages);
  }

  await blog.save();

  res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

/* ===========================
   DELETE BLOG
=========================== */
export const deleteBlog = AsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Unauthorized to delete this blog");
  }

  await blog.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog deleted successfully"));
});

/* ===========================
   SEARCH BLOGS
=========================== */
export const searchBlogs = AsyncHandler(async (req, res) => {
  const { q, limit = 10, skip = 0 } = req.query;

  if (!q || q.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }

  const regex = new RegExp(q.trim(), "i");

  const blogs = await Blog.find({
    $or: [
      { title: regex },
      { description: regex },
      { content: regex },
      { keywords: regex },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(limit))
    .populate("author", "fullName email avatar");

  const totalResults = await Blog.countDocuments({
    $or: [
      { title: regex },
      { description: regex },
      { content: regex },
      { keywords: regex },
    ],
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        totalResults,
        count: blogs.length,
        blogs,
      },
      "Search results fetched successfully"
    )
  );
});

/* ===========================
   GET LOGGED-IN USER BLOGS
=========================== */
export const getMyBlogs = AsyncHandler(async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id })
    .sort({ createdAt: -1 })
    .select("title description images createdAt");

  res
    .status(200)
    .json(new ApiResponse(200, blogs, "My blogs fetched successfully"));
});
