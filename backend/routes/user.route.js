import express from 'express'
import { getUserProfile, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/user.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route("/register").post(
    upload.single("avatar"),
    userRegister
)
router.route("/login").post(userLogin)
router.route("/logout").post(userLogout)
router.route("/profile").get(verifyJWT, getUserProfile)
router.route("/edit-profile").put(verifyJWT,
    upload.single("avatar"),
    updateUserProfile
)

export default router;