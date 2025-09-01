import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlogById, searchBlogs, updateBlog } from '../controllers/blog.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router();

// Public
router.route("/").get(getAllBlogs)
router.route("/:id").get(getBlogById)

// Authenticated
router.route("/").post(verifyJWT, upload.array("images", 10), createBlog);
router.route("/:id/edit").put(verifyJWT, upload.array("images", 10), updateBlog)
router.route("/:id").delete(verifyJWT, deleteBlog)

router.route("/search").get(searchBlogs)

export default router;