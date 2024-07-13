import Post from "../models/Posts.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content || !req.body.topic) {
    return next(errorHandler(400, "All fields are required!"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-"); // for post URL

  const postCreated = new Post({
    ...req.body,
    slug,
    author: req.user.id,
  });

  try {
    await postCreated.save();
    res
      .status(201)
      .json(new ApiResponse(201, postCreated, "Post created successfully."));
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
const postToDelete = await Post.findOne({ _id: req.params.id });
//   console.log(id);
  console.log(postToDelete.author);

  if (req.user.id !== postToDelete.author.toString()) {
    return next(errorHandler(409, "You can only delete your post!"));
  }

  try {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
  } catch (error) {
    next(error);
  }
};
