const Enrollment = require("../models/enrollment"); // Adjust the path as necessary
const Course = require("../models/course");
const addEnrollment = async (req, res) => {
  const { userId, courseDetails } = req.body;

  // Basic validation
  if (!userId || !courseDetails || !Array.isArray(courseDetails)) {
    return res.status(400).json({
      error: "User ID and Course Details (as an array) are required",
    });
  }

  try {
    const enrollment = new Enrollment({
      userId,
      courseDetails: courseDetails.map((detail) => ({
        courseId: detail.courseId,
        date: detail.date || Date.now(),
      })),
    });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId")
      .populate("courseDetails.courseId");
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getEnrollmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findById(id)
      .populate("userId")
      .populate("courseDetails.courseId");
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getEnrollmentByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId })
      .populate("userId")
      .populate("courseDetails.courseId");
    if (!enrollments) {
      return res
        .status(404)
        .json({ error: "No enrollments found for this user" });
    }
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getEnrollmentByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({
      "courseDetails.courseId": courseId,
    }).populate({
      path: "userId",
    });

    if (enrollments.length === 0) {
      return res
        .status(404)
        .json({ error: "No enrollments found for this course" });
    }

    const users = enrollments.map((enrollment) => {
      return {
        user: enrollment.userId,
        course: enrollment.courseDetails.find((cd) => cd.courseId == courseId),
      };
    });

    const userList = users.map((user) => user.user);

    const course = users[0].course;

    const courseDetails = await Course.findById(course.courseId);
    res
      .status(200)
      .json({ courseDetails, quantity: userList.length, userList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentByUserId,
  getEnrollmentByCourseId,
};
