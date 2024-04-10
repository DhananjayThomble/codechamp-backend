const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");
const authenticateUser = require("../middlewares/authenticate");
const {
  enrollCourseValidator,
} = require("../validators/enrollCourseValidators");
const validatorErrorHandler = require("../middlewares/validatorErrorHandler");

router.post(
  "/",
  enrollCourseValidator,
  validatorErrorHandler,
  authenticateUser,
  enrollmentController.enrollCourse
);

router.get("/", authenticateUser, enrollmentController.getEnrolledCourses);

module.exports = router;
