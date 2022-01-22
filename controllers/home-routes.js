const router = require("express").Router();
const { append } = require("express/lib/response");
const { User, Post, Comment } = require("../models");

// Get homepage
router.get("/", (req, res) => {
  res.render("homepage", { tabTitle: "Homepage" });
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
