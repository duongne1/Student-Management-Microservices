const Course = require("../models/course");

const addCourse = async (req, res) => {
  const { name, creditHours } = req.body;
  try {
    const course = new Course({
      name: name,
      creditHours: creditHours,
    });
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
};
