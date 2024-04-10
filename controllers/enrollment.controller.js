const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Course Enrollment
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;
    // Check if the user is already enrolled in the course
    const existingEnrollment = await prisma.courseEnrollment.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    if (existingEnrollment) {
      return res.status(400).send("You are already enrolled in this course");
    }

    // Enroll the user in the course
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    res.status(201).send(enrollment);
  } catch (error) {
    console.error("Error from enroll course controller", error);
    res.status(500).send("Internal Server Error");
  }
};

// View Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const enrollments = await prisma.courseEnrollment.findMany({
      where: { userId },
      include: { course: true },
    });

    // Extract the courses from the enrollments
    const courses = enrollments.map((enrollment) => enrollment.course);

    res.send(courses);
  } catch (error) {
    console.error("Error from get enrolled courses controller", error);
    res.status(500).send("Internal Server Error");
  }
};
