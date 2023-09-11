const express = require("express");
const router = express.Router();
const { Item, List } = require("../models/item"); // Import both Item and List models

// Routes for items
router.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({});

    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Default items successfully inserted into the database.");
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ name: itemName });

  try {
    if (listName === "Today") {
      await item.save();
      res.redirect("/");
    } else {
      const foundList = await List.findOne({ name: listName });

      if (foundList) {
        foundList.items.push(item);
        await foundList.save();
        res.redirect("/" + listName);
      }
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/:customListName", async (req, res) => {
  const customListName = req.params.customListName;

  if (customListName === "about") {
    // Handle the "about" page separately
    res.render("about"); // Render the "about" page
    return;
  }

  if (customListName === "docs") {
    // Handle the "about" page separately
    res.render("docs"); // Render the "about" page
    return;
  }

  try {
    const foundList = await List.findOne({ name: customListName });

    if (!foundList) {
      // Create a new custom list with default items if it doesn't exist
      const list = new List({
        name: customListName,
        items: defaultItems,
      });

      await list.save();
      res.redirect("/" + customListName);
    } else {
      // Render the existing custom list if it already exists
      res.render("list", {
        listTitle: foundList.name,
        newListItems: foundList.items,
      });
    }
  } catch (err) {
    console.error(err);
    // Handle the error, e.g., send an error response or redirect to an error page
  }
});

router.post("/delete", async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    await Item.findByIdAndRemove(checkedItemId);

    console.log(`Item with ID ${checkedItemId} has been deleted.`);
    res.redirect("/");
  }else {
    
  }
});

const item1 = new Item({
  name: "Welcome to your To Do List",
});

const item2 = new Item({
  name: "Hit + button to add a new item",
});

const item3 = new Item({
  name: "<-- Hit checkbox to delete an item",
});

const defaultItems = [item1, item2, item3];

module.exports = router;
