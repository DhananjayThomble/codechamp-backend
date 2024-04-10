const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const authorizeUser = require("../middlewares/authorizeUser");
const authenticateUser = require("../middlewares/authenticate");
const validatorErrorHandler = require("../middlewares/validatorErrorHandler");
const {
  createCourseValidator,
  updateCourseValidator,
} = require("../validators/courseValidators");

// Get courses with filtering and pagination
router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourse);

// CRUD operations for superadmin
router.post(
  "/",
  createCourseValidator,
  validatorErrorHandler,
  authenticateUser,
  authorizeUser(["SUPERADMIN"]),
  courseController.createCourse
);

router.put(
  "/:id",
  updateCourseValidator,
  validatorErrorHandler,
  authenticateUser,
  authorizeUser(["SUPERADMIN"]),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeUser(["SUPERADMIN"]),
  courseController.deleteCourse
);

module.exports = router;
