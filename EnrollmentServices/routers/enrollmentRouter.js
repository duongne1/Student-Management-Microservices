const { Router } = require("express");
const enrollmentController = require("../controllers/enrollmentController");

const router = Router();

router.post("/AddEnrollment", enrollmentController.addEnrollment);
router.get("/getAllEnrollments", enrollmentController.getAllEnrollments);
router.get("/getEnrollmentById/:id", enrollmentController.getEnrollmentById);
router.get(
  "/getEnrollmentByUserId/:userId",
  enrollmentController.getEnrollmentByUserId
);
router.get(
  "/getEnrollmentByCourseId/:courseId",
  enrollmentController.getEnrollmentByCourseId
);

module.exports = router;
