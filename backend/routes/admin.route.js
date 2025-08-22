import {Router} from "express";
import {adminLogin, adminSignup, forgotPassword, getProfile, resetPassword, updateProfile} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    adminSignup
)

router.route("/login").post(adminLogin)
router.route("/edit-profile/:id").put(
    verifyJWT,
    upload.single("avatar"),
    updateProfile
)
router.route("/profile/:id").get(verifyJWT, getProfile)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)


export default router;