const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();

const app = express();
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(requestLogger);

// override the default console.log method to use the custom logger
const logger = require("./config/winston");
if (process.env.NODE_ENV === "production") {
  console.log = (message) => {
    logger.info(message);
  };

  console.error = (message) => {
    logger.error(message);
  };
}

app.get("/", (req, res) => {
  res.send("Hello from / route");
});

const userRouter = require("./routes/user.route");
const courseRouter = require("./routes/course.route");
const enrollmentRouter = require("./routes/enrollment.route");

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My E Learning API",
      version: "1.0.0",
      description: "An API for an e-learning platform",
    },
  },
  apis: ["./routes/*.js", "./schemas/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
});
