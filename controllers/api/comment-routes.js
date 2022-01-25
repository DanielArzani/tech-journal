const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => {
      res.status(200).json({
        status: "success",
        data: {
          comments: dbCommentData,
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

// Get comment
router.get("/:id", (req, res) => {
  Comment.findOne({
    where: { id: req.params.id },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No comment found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          comment: dbCommentData,
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

// Create comment
router.post("/", (req, res) => {
  Comment.create({
    content: req.body.content,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => {
      console.log(dbCommentData);
      res.status(201).json({
        status: "success",
        data: {
          comment: dbCommentData,
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

// Update comment
router.put("/:id", (req, res) => {
  Comment.update(
    {
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => {
      if (dbCommentData.includes(0)) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No comment found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          comment: dbCommentData,
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

// Delete comment
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No comment found with that ID",
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
