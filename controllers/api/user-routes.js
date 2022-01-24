const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt");

// Get all users
router.get("/", (req, res) => {
  User.findAll({
    // Comment-out in order to see users passwords
    // attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => {
      // Using the JSend specification
      res.status(200).json({
        status: "success",
        data: {
          users: dbUserData,
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

// Find user
router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content_body", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No user found with that ID",
          },
        });
        // Gaurd clause
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          user: dbUserData,
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

// Create User
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((dbUserData) => {
      // Save credentials
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.status(201).json({
          status: "success",
          data: {
            user: dbUserData,
          },
        });
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

// Login
router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          status: "fail",
          data: {
            email: "No user found with that email",
          },
        });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({
          status: "fail",
          data: {
            password: "Incorrect password!",
          },
        });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.status(200).json({
          status: "success",
          data: {
            user: dbUserData,
            message: "You are now logged in",
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err,
      });
    });
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update User
router.put("/:id", (req, res) => {
  User.update(req.body, {
    // For hashing updated password
    individualHooks: true,
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      // (!dbUserData) will still return successful even if the ID doesn't exist, since dbUserdata will either return [0] or [1], this method can be used to check
      if (dbUserData.includes(0)) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No user found with that ID",
          },
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          user: dbUserData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        data: {
          message: err,
        },
      });
    });
});

// Delete User
router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          status: "fail",
          data: {
            id: "No user found with that ID",
          },
        });
        return;
      }
      res.status(204).json({
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
