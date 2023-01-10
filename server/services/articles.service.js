const httpStatus = require("http-status");
const { use } = require("passport");
const { ApiError } = require("../middlewares/apiError");
const { Article } = require("../models/article");

const addArticle = async (body) => {
  try {
    const article = new Article({
      ...body,
      score: parseInt(body.score),
    });
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

const getArticleById = async (_id, user) => {
  try {
    const article = await Article.findById(_id);
    if (!article) throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
    if (user.role === "user" && article.status === "draft") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry not authorized");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

const getUsersArticleById = async (_id) => {
  try {
    const article = await Article.findById(_id);
    if (!article) throw new ApiError(httpStatus.NOT_FOUND, "Article not found");
    if (article.status === "draft") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry not authorized");
    }
    return article;
  } catch (error) {
    throw error;
  }
};

module.exports = { addArticle, getArticleById, getUsersArticleById };
