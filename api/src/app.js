import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// importing routes
import eventRouter from "./routes/Events.routes.js";
import authRouter from "./routes/Auth.routes.js";

// starting the app
const app = express();

// middleware configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser()); // to get access of the cookies
app.use(express.json({ limit: "16kb" })); // limit of acceptance of json data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// test route
app.get("/", (req, res) => {
  res.send("server is up!");
});

// handling the routes
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/auth", authRouter);

// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export { app };