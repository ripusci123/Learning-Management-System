import { Router } from "express";
import { enrollCourse, getAllCourses, getCourse, getCurrentUser, getMyCourses, loginUser, logoutUser, registerUser } from "../../controllers/user.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { checkUserJWT, verifyUserJWT } from "../../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    //user is valid or not
    upload.single("avatar"),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/all-courses").get(getAllCourses)
router.route("/my-courses").get(verifyUserJWT, getMyCourses)
router.route("/course/:courseId").get(verifyUserJWT, getCourse)

router.route("/current-user").get(verifyUserJWT,getCurrentUser)
router.route("/enroll-course/:courseId").get(verifyUserJWT,enrollCourse)

export default router