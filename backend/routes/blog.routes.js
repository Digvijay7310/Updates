import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getMyBlogs, searchBlogs, updateBlog } from '../controllers/blog.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router();

// Public
router.get("/search", searchBlogs)
router.get("/my-blogs", verifyJWT, getMyBlogs)
router.get("/", getAllBlogs)
router.get("/:id", getBlogById)

// Authenticate
router.post("/create-blog", verifyJWT, upload.array("images", 10), createBlog)
router.put("/:id", verifyJWT, upload.array("images", 10), updateBlog)
router.delete("/:id", verifyJWT, deleteBlog)



export default router;