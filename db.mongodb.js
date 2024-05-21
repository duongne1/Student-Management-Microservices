use("studentManagement");

db.createCollection("users");
db.createCollection("courses");
db.createCollection("enrollments");
db.createCollection("grades");
db.createCollection("feedbacks");

db.users.insertMany([
  {
    _id: ObjectId("664c706adfd0327d485e2567"),
    dateofbirth: ISODate("1990-01-01"),
    gender: "male",
    name: "Nguyễn Nhất An",
    username: "0909878765",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
  {
    _id: ObjectId("664c706adfd0327d485e2568"),
    dateofbirth: ISODate("1990-01-02"),
    gender: "female",
    name: "Nguyễn Văn Tèo",
    username: "0987654324",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
  {
    _id: ObjectId("664c706adfd0327d485e2569"),
    dateofbirth: ISODate("1990-01-04"),
    gender: "male",
    name: "Nguyễn Trường Tuấn Kiệt",
    username: "0676542567",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
]);

db.courses.insertMany([
  {
    _id: ObjectId("664c706adfd0327d485e256a"),
    name: "Introduction to Programming",
    creditHours: 3,
  },
  {
    _id: ObjectId("664c706adfd0327d485e256b"),
    name: "Database Management Systems",
    creditHours: 4,
  },
  {
    _id: ObjectId("664c706adfd0327d485e256c"),
    name: "Web Development",
    creditHours: 4,
  },
]);

db.enrollments.insertMany([
  {
    userId: ObjectId("664c706adfd0327d485e2567"),
    courseDetails: [
      {
        courseId: ObjectId("664c706adfd0327d485e256a"),
        date: new Date(),
      },
      {
        courseId: ObjectId("664c706adfd0327d485e256b"),
        date: new Date(),
      },
      {
        courseId: ObjectId("664c706adfd0327d485e256c"),
        date: new Date(),
      },
    ],
  },
  {
    userId: ObjectId("664c706adfd0327d485e2568"),
    courseDetails: [
      {
        courseId: ObjectId("664c706adfd0327d485e256c"),
        date: new Date(),
      },
      {
        courseId: ObjectId("664c706adfd0327d485e256b"),
        date: new Date(),
      },
    ],
  },
  {
    userId: ObjectId("664c706adfd0327d485e2569"),
    courseDetails: [
      {
        courseId: ObjectId("664c706adfd0327d485e256a"),
        date: new Date(),
      },
      {
        courseId: ObjectId("664c706adfd0327d485e256b"),
        date: new Date(),
      },
    ],
  },
]);

db.grades.insertMany([
  {
    _id: ObjectId("664c706adfd0327d485e1209"),
    userId: ObjectId("664c706adfd0327d485e2567"),
    grades: [
      { courseId: ObjectId("664c706adfd0327d485e256a"), grade: 8.5 },
      { courseId: ObjectId("664c706adfd0327d485e256b"), grade: 9.0 },
      { courseId: ObjectId("664c706adfd0327d485e256c"), grade: 7.0 },
    ],
  },
  {
    _id: ObjectId("664c706adfd0327d485e4409"),
    userId: ObjectId("664c706adfd0327d485e2568"),
    grades: [
      { courseId: ObjectId("664c706adfd0327d485e256c"), grade: 7.8 },
      { courseId: ObjectId("664c706adfd0327d485e256b"), grade: 8.2 },
    ],
  },
  {
    _id: ObjectId("664c706adfd0327d111e1209"),
    userId: ObjectId("664c706adfd0327d485e2569"),
    grades: [
      { courseId: ObjectId("664c706adfd0327d485e256a"), grade: 6.5 },
      { courseId: ObjectId("664c706adfd0327d485e256b"), grade: 8.0 },
    ],
  },
]);

db.feedbacks.insertMany([
  {
    _id: ObjectId("664c706adfd0327d485e2567"),
    userId: ObjectId("664c706adfd0327d485e2567"),
    courseId: ObjectId("664c706adfd0327d485e256a"),
    rating: 5,
    comment: "Great course!",
    createdAt: new Date(),
  },
  {
    _id: ObjectId("664c706adfd0327d485e2568"),
    userId: ObjectId("664c706adfd0327d485e2567"),
    courseId: ObjectId("664c706adfd0327d485e256a"),
    rating: 4,
    comment: "Very informative.",
    createdAt: new Date(),
  },
  {
    _id: ObjectId("664c706adfd0327d485e2569"),
    userId: ObjectId("664c706adfd0327d485e2567"),
    courseId: ObjectId("664c706adfd0327d485e256c"),
    rating: 3,
    comment: "Good but could be better.",
    createdAt: new Date(),
  },
]);
