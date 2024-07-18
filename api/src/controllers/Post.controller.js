import Post from "../models/Posts.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content || !req.body.topic) {
    return next(errorHandler(400, "All fields are required!"));
  }

  if (req.body.title.length < 4) {
    return next(errorHandler(400, "Title must be at least 4 characters long."));
  }

  if (req.body.content.length < 10) {
    return next(
      errorHandler(400, "Content must be at least 10 characters long.")
    );
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
  // console.log(id);
  console.log(postToDelete.author);

  if (!req.user.isAdmin && req.user.id !== postToDelete.author.toString()) {
    return next(errorHandler(409, "You can only delete your post!"));
  }

  try {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  const userId = req.params.userId;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;

  try {
    const postsOfTheUser = await Post.find({ author: userId })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    res
      .status(200)
      .json(new ApiResponse(200, postsOfTheUser, "Posts fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    // console.log(req.query);

    // if the req has a user id or category or slug we search based on that
    const posts = await Post.find({
      ...(req.query.userId && { author: req.query.userId }),
      ...(req.query.topic && { topic: req.query.topic }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const postInMonth = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json(
      new ApiResponse(
        200,
        {
          posts,
          totalPosts,
          postInMonth,
        },
        "Posts fetched!"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to edit others post."));
  }

  if (req.body.title) {
    return next(
      errorHandler(401, "You can only update the content of the post!")
    );
  }

  try {
    const editedPost = await Post.findByIdAndUpdate(
      { _id: req.params.postId },
      {
        $set: {
          content: req.body.content,
          topic: req.body.topic,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, editedPost, "Post has been updated!"));
  } catch (error) {
    next(error);
  }
};
