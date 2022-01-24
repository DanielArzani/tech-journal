const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
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
  })
    .then((dbPostData) => {
      res.status(200).json({
        status: "success",
        data: {
          posts: dbPostData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

// Get post
router.get("/:id", (req, res) => {
  Post.findOne({
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
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No post found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          post: dbPostData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

// Create post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    content_body: req.body.content_body,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => {
      res.status(201).json({
        status: "success",
        data: {
          post: dbPostData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

// Update post
router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      user_id: req.body.user_id,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbPostData) => {
      if (dbPostData.includes(0)) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No post found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          post: dbPostData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

// Delete post
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No post found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: null,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

module.exports = router;
