const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary.config");
const zxcvbn = require("zxcvbn");
const sendWelcomeMail = require("../utility/sendWelcomeMail");
const sendPasswordResetMailDev = require("../utility/sendPasswordResetMailDev");

// controller for user registration
//todo: add null validation for email and password
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });

  // check if password is strong enough
  const passwordStrength = zxcvbn(password);
  // console.log(`password strength: ${passwordStrength.score}`);
  // score of 0-4, 0 being weak and 4 being strong
  if (passwordStrength.score < 3) {
    return res.status(400).json({
      message:
        "Password is not strong enough. " +
        passwordStrength.feedback.suggestions,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // send welcome email
    sendWelcomeMail(email, name);

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("error from resgister controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login controller with jwt
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        // TODO: set expiresIn to a shorter time
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("error from login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// password reset functionality
const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // send password reset email
    // TODO: change the client URL to the actual client URL
    // const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const devResetLink = `${process.env.SERVER_URL}/users/update-password`;
    // sendPasswordResetMail(email, user.name, devRestLink);
    sendPasswordResetMailDev(email, user.name, token, devResetLink);
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("error from resetPassword controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required" });
  }

  // check if password is strong enough
  const passwordStrength = zxcvbn(password);
  // console.log(`password strength: ${passwordStrength.score}`);
  // score of 0-4, 0 being weak and 4 being strong
  if (passwordStrength.score < 3) {
    return res.status(400).json({
      message:
        "Password is not strong enough. " +
        passwordStrength.feedback.suggestions,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res
      .status(200)
      .json({ message: "Password updated successfully", updatedUser });
  } catch (error) {
    console.error("error from updatePassword controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// user profile functionality
const profile = async (req, res) => {
  const { userId } = req;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("error from profile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req;
  const { name, email, mobile } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        mobile,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
      },
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error("error from updateProfile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfilePicture = async (req, res) => {
  const { userId } = req;
  // is there a file in the request?
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file" });
  }
  // upload the file to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);
  const profilePicture = result.secure_url;

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture,
      },
      select: {
        id: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    console.error("error from updateProfilePicture controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for admin

const registerSuperAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // check if password is strong enough
  const passwordStrength = zxcvbn(password);
  // console.log(`password strength: ${passwordStrength.score}`);
  // score of 0-4, 0 being weak and 4 being strong
  if (passwordStrength.score < 3) {
    return res.status(400).json({
      message:
        "Password is not strong enough. " +
        passwordStrength.feedback.suggestions,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res
      .status(201)
      .json({ message: "Super Admin created successfully", data: newUser });
  } catch (error) {
    console.error("error from resgister controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exporting the controller
module.exports = {
  register,
  login,
  resetPassword,
  updatePassword,
  profile,
  updateProfile,
  updateProfilePicture,
  registerSuperAdmin,
};
