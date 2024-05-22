const { Router } = require("express");

const router = Router();
const gradeController = require("../controllers/gradeController");

router.post("/addGrade", gradeController.addGrade);
//http://localhost:3004/api/v1/grades/getAllGrades
router.get("/getAllGrades", gradeController.getAllGrades);

router.get("/getGradeByUserId/:userId", gradeController.getGradesByUserId);

module.exports = router;
