import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { addLecture, createCourse, deleteCourse, deleteLecture, editCourse, editLecture, getCourse, getCurrentUploader, getLectures, getUploadedCourses, getUploader, loginUploader, logoutUploader, registerUploader, updateProfile } from "../../controllers/uploader.controller.js";
import { verifyUploaderJWT } from "../../middlewares/auth.middleware.js";
import { isUploader } from "../../middlewares/isUploader.middleware.js";
const router = Router()


router.route("/register").post(
    upload.single("avatar"),
    registerUploader
)
router.route("/login").post(loginUploader)
router.route("/logout").get(logoutUploader)
router.route("/current-uploader").get(verifyUploaderJWT, getCurrentUploader)
router.route("/update-profile").put(
    verifyUploaderJWT,
    upload.single("avatar"),
    updateProfile
)


router.route("/create-course").post(verifyUploaderJWT, isUploader, upload.fields([
    {
        name: "poster",
        maxCount: 1
    },
    {
        name: "document",
        maxCount: 1
    }
]), createCourse)
router.route("/course/uploadedCourses").get(verifyUploaderJWT, getUploadedCourses)
router.route("/course/:courseId").get(verifyUploaderJWT, getCourse)
router.route("/edit-course/:courseId").put(verifyUploaderJWT, isUploader,upload.fields([
    {
        name: "poster",
        maxCount: 1
    },
    {
        name: "document",
        maxCount: 1
    }
]), editCourse)

router.route("/delete-course/:courseId").delete(verifyUploaderJWT, isUploader, deleteCourse)


router.route("/add-lecture/:courseId").post(verifyUploaderJWT, isUploader,
    upload.single("video"),
    addLecture)
router.route("/edit-lecture").put(verifyUploaderJWT, isUploader,upload.single("video"),editLecture)
router.route("/delete-lecture").delete(verifyUploaderJWT, isUploader, deleteLecture)
router.route("/get-lectures/:courseId").get(verifyUploaderJWT, isUploader, getLectures)
router.route("/uploader/:uploaderId").get(getUploader)





export default router