const { body } = require("express-validator");

const enrollCourseValidator = [
  body("courseId").notEmpty().withMessage("Course ID is required"),
];

module.exports = {
  enrollCourseValidator,
};
