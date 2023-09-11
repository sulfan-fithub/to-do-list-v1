const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("WorkItem", workItemSchema);
