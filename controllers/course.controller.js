const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get courses with filtering and pagination
exports.getCourses = async (req, res) => {
  try {
    // Construct the query object based on the request query parameters
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.level) query.level = req.query.level;
    if (req.query.popularity)
      query.popularity = parseInt(req.query.popularity, 10);

    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = parseInt(req.query.skip, 10) || 0;

    const courses = await prisma.course.findMany({
      where: query,
      take: limit,
      skip,
    });

    res.json(courses);
  } catch (error) {
    // only sending the error occurred in the server, not sharing the error details with the client for security reasons
    console.error("Error from get courses controller", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createCourse = async (req, res) => {
  try {
    // Validate the request body
    if (!req.body.title || !req.body.category) {
      return res.status(400).send("Missing required fields");
    }

    const course = await prisma.course.create({
      data: {
        title: req.body.title,
        category: req.body.category,
        level: req.body.level || "Beginner",
        popularity: req.body.popularity || 0,
      },
    });

    res.status(201).send(course);
  } catch (error) {
    console.error("Error from create course controller", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a single course by id
exports.getCourse = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    });
    if (!course) return res.status(404).send("Course not found");
    res.send(course);
  } catch (error) {
    console.error("Error from get course controller", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update a course by id
exports.updateCourse = async (req, res) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body,
    });

    if (!course) return res.status(404).send("Course not found");
    res.send(course);
  } catch (error) {
    console.error("Error from update course controller", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a course by id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await prisma.course.delete({
      where: { id: req.params.id },
    });
    if (!course) return res.status(404).send("Course not found");
    res.send(course);
  } catch (error) {
    console.error("Error from delete course controller", error);
    res.status(500).send("Internal Server Error");
  }
};
