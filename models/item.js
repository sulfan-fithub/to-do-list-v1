const mongoose = require("mongoose");

// Define the schema for the "item" model
const itemSchema = new mongoose.Schema({
  name: String,
});

// Create the "item" model using the schema
const Item = mongoose.model("Item", itemSchema);

// Define the schema for the "list" model
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema], // Use the "item" schema for the "items" array
});

// Create the "list" model using the schema
const List = mongoose.model("List", listSchema);

module.exports = { Item, List }; // Export both models

