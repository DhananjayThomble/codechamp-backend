const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");
const authenticateUser = require("../middlewares/authenticate");

router.post("/", authenticateUser, enrollmentController.enrollCourse);

router.get("/", authenticateUser, enrollmentController.getEnrolledCourses);

module.exports = router;
