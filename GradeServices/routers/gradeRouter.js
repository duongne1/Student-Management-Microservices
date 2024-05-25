const { Router } = require("express");
const middleware = require("../middlewares/middlewareController");

const router = Router();
const gradeController = require("../controllers/gradeController");

router.post("/addGrade", middleware.verifyTokenAuth,gradeController.addGrade);
//http://localhost:3004/api/v1/grades/getAllGrades
router.get("/getAllGrades",middleware.verifyTokenAuth, gradeController.getAllGrades);

router.get("/getGradeByUserId/:userId",middleware.verifyToken, gradeController.getGradesByUserId);

module.exports = router;
