const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const authorizeUser = require("../middlewares/authorizeUser");
const authenticateUser = require("../middlewares/authenticate");

// Get courses with filtering and pagination
router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourse);

// CRUD operations for superadmin
router.post("/", authenticateUser, authorizeUser(["SUPERADMIN"]), courseController.createCourse);

router.put(
  "/:id",
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
