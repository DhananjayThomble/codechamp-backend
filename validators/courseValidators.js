const { body } = require("express-validator");

const createCourseValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("category").notEmpty().withMessage("Category is required"),

  body("level")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Level must be either 'Beginner', 'Intermediate', or 'Advanced'"
    ),

  body("popularity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Popularity must be a positive integer"),
];

const updateCourseValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("category").optional(),

  body("level")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Level must be either 'Beginner', 'Intermediate', or 'Advanced'"
    ),

  body("popularity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Popularity must be a positive integer"),
];

module.exports = {
  createCourseValidator,
  updateCourseValidator,
};
