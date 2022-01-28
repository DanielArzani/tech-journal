const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get dashboard
router.get("/", withAuth, async (req, res) => {
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

  // Render
  const state = req.session;
  res.render("dashboard", {
    tabTitle: "Dashboard",
    editOrNot: true,
    state,
    posts,
  });
});

// Edit posts
router.get("/edit/:id", withAuth, async (req, res) => {
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

  const post = response.get({ plain: true });
  // Render
  const state = req.session;
  res.render("edit-post", { tabTitle: "Post", state, post });
});

module.exports = router;
