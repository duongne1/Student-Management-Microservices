const { Router } = require("express");

const router = Router();
const courseController = require("../controllers/courseController");

// http://localhost:3001/api/v1/courses/addCourse
router.post("/addCourse", courseController.addCourse);
// http://localhost:3001/api/v1/courses/getAllCourses
router.get("/getAllCourses", courseController.getAllCourses);
// lấy ra danh sách bạn bè của 1 user  theo id cuả user
// http://localhost:3001/api/v1/courses/getCourseById
router.get("/getCourseById/:id", courseController.getCourseById);

module.exports = router;
