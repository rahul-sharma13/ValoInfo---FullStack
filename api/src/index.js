import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Port is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED!! : ", err);
  });
