const express = require("express");
const router = express.Router();

// Define your routes using the router object
router.get("/", function (req, res) {
  res.render("about"); // Render the "about.ejs" view
});

module.exports = router;
