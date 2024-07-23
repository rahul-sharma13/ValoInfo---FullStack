import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "tittle is required."],
      unique: true,
      trim: true,
      maxLength: 30,
      minLength: 4,
    },
    content: {
      type: String,
      required: [true, "content is required."],
      trim: true,
      minLength: 100,
      maxLength: 1000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://owcdn.net/img/669cfee9e92c8.jpg",
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
