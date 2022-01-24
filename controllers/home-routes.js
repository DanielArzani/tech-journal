const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Get homepage
router.get("/", async (req, res) => {
  // Get all posts
  const response = await Post.findAll({
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

  // Loop through and serialize
  const posts = response.map((post) => post.get({ plain: true }));

  // Render
  const state = req.session;
  res.render("homepage", { tabTitle: "Homepage", state, posts });
});

// Get signup page
router.get("/signup", (req, res) => {
  res.render("signup", { tabTitle: "Signup" });
});

// Get login page
router.get("/login", (req, res) => {
  res.render("login", { tabTitle: "Login" });
});

module.exports = router;
