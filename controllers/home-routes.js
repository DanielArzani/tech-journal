const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Get homepage
router.get("/", async (req, res) => {
  // Get all posts
  const response = await Post.findAll({
    attributes: ["id", "title", "content_body", "user_id", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  });

  // Loop through and serialize
  const posts = response.map((post) => post.get({ plain: true }));

  // Render
  const state = req.session;
  res.render("homepage", { tabTitle: "Homepage", state, posts });
});

// Get single post page
router.get("/posts/:id", async (req, res) => {
  const response = await Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "content_body", "user_id", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  });

  const state = req.session;
  const post = response.get({ plain: true });

  res.render("view-post", { editOrNot: false, state, post });
});

// Get signup page
router.get("/signup", (req, res) => {
  res.render("signup", { tabTitle: "Signup", layout: "account" });
});

// Get login page
router.get("/login", (req, res) => {
  res.render("login", { tabTitle: "Login", layout: "account" });
});

module.exports = router;
