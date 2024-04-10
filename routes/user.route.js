const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  resetPassword,
  updatePassword,
  updateProfile,
  updateProfilePicture,
  registerSuperAdmin,
} = require("../controllers/user.controller");

const authenticateUser = require("../middlewares/authenticate");
const upload = require("../middlewares/multerConfig");
const authorizeUser = require("../middlewares/authorizeUser");

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *        description: Bad request
 *       500:
 *        description: Internal server error
 */
router.post("/register", register);

router.post("/login", login);

router.post("/reset-password", resetPassword);

router.put("/update-password", updatePassword);

router.get("/profile", authenticateUser, profile);

router.put("/profile", authenticateUser, updateProfile);

router.put(
  "/profile-picture",
  authenticateUser,
  upload.single("profilePicture"),
  updateProfilePicture
);

// for admin
router.post(
  "/register-superadmin",
  authenticateUser,
  authorizeUser(["SUPERADMIN"]),
  registerSuperAdmin
);

module.exports = router;
