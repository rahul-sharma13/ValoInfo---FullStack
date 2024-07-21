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

// to get comments under a post
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments retrieved successfully."));
  } catch (error) {
    next(error);
  }
};

// for like funtionality
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    // to get the index of user in likes array, to ensure one user only likes it once
    const userIndex = comment.likes.indexOf(req.user.id);

    // if user is not in array it returns -1
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment liked successfully"));
  } catch (error) {
    next(error);
  }
};

// for editing comments
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (comment.userId.toString() !== req.user.id) {
      return next(
        errorHandler(401, "You are not allowed to perform this action")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content : req.body.content },
      { new: true }
    );

    res.status(200).json(new ApiResponse(200, editedComment, "Comment edited successfully"));
  } catch (error) {
    next(error);
  }
};

// for deleting comments
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (comment.userId.toString() !== req.user.id) {
      return next(
        errorHandler(401, "You are not allowed to perform this action")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));
  } catch (error) {
    next(error);
  }
};