const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courseDetails: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      date: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
