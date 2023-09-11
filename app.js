const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Configure app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const itemsRoutes = require("./routes/itemsRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

// Use routes
app.use("/", itemsRoutes);

// Define routes for the "about" section
app.get("/about", (req, res) => {
  res.render("about"); // Render the "about" page
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
