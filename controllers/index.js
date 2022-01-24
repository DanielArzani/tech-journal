// Dependencies
const router = require("express").Router();

// Contains all user facing routes such as the homepage and login page
const homeRoutes = require("./home-routes");
// Contains all api routes
const apiRoutes = require("./api");
// Contains all dashboard routes
const dashboardRoutes = require("./dashboard-routes");

// Middleware
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

// This is so if we make a request to any endpoint that doesn't exist, we'll receive a 404 error indicating we have requested an incorrect resource
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
