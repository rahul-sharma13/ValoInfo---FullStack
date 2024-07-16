import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 300,
    },
    topic : {
      type: String,
      required: [true, "add a topic"],
      enum: ["General", "Valorant", "Site Discussion"],
      default: "General",
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
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
