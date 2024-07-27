import dotenv from "dotenv";
import connectDb from "./src/db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import eventRouter from "./src/routes/Events.routes.js";
import authRouter from "./src/routes/Auth.routes.js";
import userRouter from "./src/routes/User.routes.js";
import postRouter from "./src/routes/Post.routes.js";
import commentRouter from "./src/routes/Comment.routes.js";
import articleRouter from "./src/routes/Article.routes.js";

dotenv.config({
  path: "./env",
});

const app = express();

app.get("/", (req, res) => {
  res.send("server is up index!");
});

// middleware setup
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" })); // limit of acceptance of json data
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);
app.use(express.static("public"));
app.use(cookieParser());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// handling the routes
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/article", articleRouter);

// connecting to the database
connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Port is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED!! : ", err);
  });

