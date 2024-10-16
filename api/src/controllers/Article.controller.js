import Article from "../models/Article.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createArticle = async (req, res, next) => {
  const { title, content, image } = req.body;
  if (!title || !content) {
    return next(errorHandler(400, "Title and content are required!"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const articleCreated = new Article({
    ...req.body,
    slug,
    author: req.user.id,
  });
  try {
    await articleCreated.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, articleCreated, "Article created successfully.")
      );
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const article = await Article.findOne({ slug }).populate({ path: "author", select: "-_id" });
    if (!article) {
      return next(errorHandler(404, "Article not found."));
    }
    res
      .status(200)
      .json(new ApiResponse(200, article, "Article retrieved successfully."));
  } catch (error) {
    next(error);
  }
};

export const getAllArticles = async (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const articles = await Article.find( searchTerm ? { title: { $regex: searchTerm, $options: "i" } } : {}).populate({ path: "author", select: "-password -createdAt -updatedAt" }).skip(startIndex).limit(limit);
    res
      .status(200)
      .json(new ApiResponse(200, articles, "Articles retrieved successfully."));
  } catch (error) {
    next(error);
  }
};
