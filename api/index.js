import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./src/db/index.js";

dotenv.config({
  path: "./env",
});

app.get("/", (req, res) => {
  res.send("server is up index!");
});

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
