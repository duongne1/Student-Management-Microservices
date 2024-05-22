const { Router } = require("express");
const middlewareController = require("../middlewares/middlewareController");

const router = Router();
const userController = require("../controllers/userController");

// http://localhost:3002/api/v1/users/login
router.post("/login", userController.login);
// http://localhost:3002/api/v1/users/sinup
router.post("/signup", userController.signup);

// http://localhost:3002/api/v1/users/getAllUser
router.get(
  "/getAllUser",
  middlewareController.verifyToken,
  userController.getAllUser
);
// http://localhost:3002/api/v1/users/getUserById
router.get(
  "/getUserById:id",
  middlewareController.verifyToken,
  userController.getUserById
);
module.exports = router;
