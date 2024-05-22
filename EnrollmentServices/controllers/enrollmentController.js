const Enrollment = require("../models/enrollment"); // Adjust the path as necessary
const Course = require("../models/course");
const addEnrollment = async (req, res) => {
  const { userId, courseId } = req.body;

  // Basic validation with detailed error messages
  if (!userId) {
    return res.status(400).json({
      error: "User ID is required",
    });
  }

  if (!courseId) {
    return res.status(400).json({
      error: "Course ID is required",
    });
  }

  try {
    // Find enrollment for the student
    let enrollment = await Enrollment.findOne({ userId });

    if (!enrollment) {
      // Create new enrollment if it doesn't exist
      enrollment = new Enrollment({
        userId,
        courseDetails: [{ courseId, date: Date.now() }],
      });
      await enrollment.save();
    } else {
      // Check if the course already exists in courseDetails
      const courseExistsInEnrollment = enrollment.courseDetails.some(
        (course) => course.courseId.toString() === courseId
      );

      if (courseExistsInEnrollment) {
        return res.status(400).json({ error: "Course already enrolled" });
      }

      // Add course to courseDetails if it doesn't exist
      enrollment.courseDetails.push({ courseId, date: Date.now() });
      await enrollment.save();
    }

    // Populate userId and courseId fields for better response
    enrollment = await Enrollment.findOne({ userId })
      .populate("userId")
      .populate("courseDetails.courseId");

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
