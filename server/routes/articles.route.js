const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const auth = require("../middlewares/auth");

router.post(
  "/",
  auth("createAny", "articles"),
  articlesController.createArticle
);

router
  .route("/article/:id")
  .get(auth("readAny", "articles"), articlesController.getArticleById);

router.route("/users/article/:id").get(articlesController.getUsersArticleById);

module.exports = router;