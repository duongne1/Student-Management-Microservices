const Course = require("../models/course");
const redisClient = require("../redis/redisController");
const addCourse = async (req, res) => {
  const { name, creditHours } = req.body;
  try {
    const course = new Course({
      name: name,
      creditHours: creditHours,
    });
    await course.save();

    const courses = await Course.find();
    // Lưu danh sách xe vào Redis với thời gian hết hạn (TTL) là 1 giờ
    await redisClient.set("courses", JSON.stringify(courses), "EX", 3600);
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();

//     res.status(200).json(courses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const getAllCourses = async (req, res) => {
  try {
    const cachedCourse = await redisClient.get("courses");
    if (cachedCourse) {
      console.log("Dữ liệu có sẵn trong Redis");
      return res.status(200).json(JSON.parse(cachedCourse));
    }
    const courses = await Course.find();
    // Lưu danh sách xe vào Redis với thời gian hết hạn (TTL) là 1 giờ
    console.log("Không có dữ liệu trong Redis, lưu dữ liệu vào Redis");
    await redisClient.set("courses", JSON.stringify(courses), "EX", 3600);
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const cachedCourse = await redisClient.get(`coursesID:${id}`);
    if (cachedCourse) {
      console.log("Dữ liệu có sẵn trong Redis");
      return res.status(200).json(JSON.parse(cachedCourse));
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("Không có dữ liệu trong Redis, lưu dữ liệu vào Redis");

    await redisClient.set(
      `coursesID:${id}`,
      JSON.stringify(course),
      "EX",
      3600
    );

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
