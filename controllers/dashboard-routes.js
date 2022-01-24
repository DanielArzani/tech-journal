const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Get dashboard
router.get("/", async (req, res) => {
  // Get all posts
  const response = await Post.findAll({
    where: { user_id: req.session.user_id },
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
  console.log(posts);

  // Render
  const state = req.session;
  res.render("dashboard", { tabTitle: "Dashboard", state, posts });
});

// Create post

module.exports = router;
