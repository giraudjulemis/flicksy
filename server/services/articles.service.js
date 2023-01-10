const httpStatus = require("http-status");
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

module.exports = { addArticle };
