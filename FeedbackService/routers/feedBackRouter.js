const { Router } = require("express");

const router = Router();
const feedBackController = require("../controllers/feedBackController");

// http://localhost:3005/api/v1/feedBacks/getAllFeedBack
router.get("/getAllFeedBack", feedBackController.getAllFeedBack);
// http://localhost:3005/api/v1/feedBacks/getFeedBackByID/
router.get("/getFeedBackByID/:id", feedBackController.getFeedBackByID);
// http://localhost:3005/api/v1/feedBacks/getFeedBackByID/
router.get(
  "/getFeedBackByUserID/:userId",
  feedBackController.getFeedBackByUserID
);
// http://localhost:3005/api/v1/feedBacks/getFeedBackByCourseID/
router.get(
  "/getFeedBackByCourseID/:courseId",
  feedBackController.getFeedBackByCourseID
);
// http://localhost:3005/api/v1/feedBacks/addFeedBack
router.post("/addFeedBack", feedBackController.addFeedBack);

module.exports = router;
