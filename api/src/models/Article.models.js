import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "tittle is required."],
      unique: true,
      trim: true,
      maxLength: 100,
      minLength: 4,
    },
    content: {
      type: String,
      required: [true, "content is required."],
      trim: true,
      minLength: 100,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    topic : {
      type: String,
      required: [true, "add a topic"],
      enum: ["General", "Valorant", "Site Discussion"],
      default: "General",
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

const Article = mongoose.model("Article", articleSchema);

export default Article;
