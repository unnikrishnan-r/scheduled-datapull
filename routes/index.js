const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

console.log("Inside Routes folder")

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  console.log("No Routes are hit", req.url, req.method);
  res.send("No Routes were hit");
});

module.exports = router;
