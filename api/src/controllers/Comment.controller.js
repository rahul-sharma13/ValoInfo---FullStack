import Comment from "../models/Comments.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(401, "You are not allowed to perform this action")
      );
    }

    const comment = new Comment({
      content,
      postId,
      userId,
    });

    await comment.save();

    res
      .status(201)
      .json(new ApiResponse(201, comment, "Comment created successfully"));
  } catch (error) {
    next(error);
  }
};
