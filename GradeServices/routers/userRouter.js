const { Router } = require("express");

const router = Router();
const userController = require("../controllers/userController");

// http://localhost:3002/api/v1/users/login
router.post("/login", userController.login);
// http://localhost:3002/api/v1/users/sinup
router.post("/sinup", userController.signup);

module.exports = router;
