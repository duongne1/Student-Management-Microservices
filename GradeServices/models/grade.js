const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  grades: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      grade: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
