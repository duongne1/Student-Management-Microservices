const FeedBack = require("../models/feedBack");
const User = require("../models/user"); // Import model User
const Course = require("../models/course"); // Import model Course
const addFeedBack = async (req, res) => {
  const { userId, courseId, rating, comment } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Kiểm tra xem courseId có tồn tại không
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  try {
    const feedback = new FeedBack({
      userId: userId,
      courseId: courseId,
      rating: rating,
      comment: comment,
    });
    await feedback.save();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteFeedBack = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await FeedBack.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFeedBackByUserID = async (req, res) => {
  const { userId } = req.params;
  try {
    const feedbacks = await FeedBack.find({ userId: userId });

    if (!feedbacks) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ countFeedBack: feedbacks.length, feedbacks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFeedBackByCourseID = async (req, res) => {
  const { courseId } = req.params;
  try {
    const feedbacks = await FeedBack.find({ courseId: courseId });

    res.status(200).json({ countFeedBack: feedbacks.length, feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllFeedBack = async (req, res) => {
  try {
    const feedbacks = await FeedBack.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFeedBackByID = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await FeedBack.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addFeedBack,
  deleteFeedBack,
  getFeedBackByUserID,
  getFeedBackByCourseID,
  getAllFeedBack,
  getFeedBackByID,
};
