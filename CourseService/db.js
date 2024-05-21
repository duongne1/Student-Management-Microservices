use("studentManagement");
db.createCollection("users");
db.createCollection("courses");

db.users.insertMany([
  {
    dateofbirth: ISODate("1990-01-01"),
    gender: "male",
    name: "Nguyễn Nhất An",
    username: "0909878765",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
  {
    dateofbirth: ISODate("1990-01-02"),
    gender: "female",
    name: "Nguyễn Văn Tèo",
    username: "0987654324",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
  {
    dateofbirth: ISODate("1990-01-04"),
    gender: "male",
    name: "Nguyễn Trường Tuấn Kiệt",
    username: "0676542567",
    password: "$2b$10$vbUKrFNutR00mYVq3M.2kOS5VTC0rZBdtsyEWAHJSmcydxiAi5L4m",
    role: "student",
  },
]);
//insert courses
db.courses.insertMany([
  {
    name: "Introduction to Programming",
    creditHours: 3,
  },
  {
    name: "Database Management Systems",
    creditHours: 4,
  },
  {
    name: "Web Development",
    creditHours: 4,
  },
]);
