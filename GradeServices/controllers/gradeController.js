const Grade = require("../models/grade");

// Thêm điểm cho một sinh viên
const addGrade = async (req, res) => {
  const { userId, grades } = req.body;
  try {
    const grade = new Grade({
      userId: userId,
      grades: grades,
    });
    await grade.save();
    res.status(200).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Lấy tất cả các bản ghi điểm
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("userId")
      .populate("grades.courseId");

    res.status(200).json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Lấy điểm của một sinh viên dựa trên userId
const getGradesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const grades = await Grade.find({ userId })
      .populate("userId")
      .populate("grades.courseId");
    if (!grades) {
      return res.status(404).json({ error: "Grades not found" });
    }
    res.status(200).json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addGrade,
  getAllGrades,
  getGradesByUserId,
};
