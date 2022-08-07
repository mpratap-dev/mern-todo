const express = require("express");
const {
  addTaskList,
  deleteList,
  getLists,
  getListItems,
  addListItem,
  changeListItemStatus,
  deleteListItemStatus,
} = require("../controllers/lists");
const router = express.Router();

router.get("/", getLists);
router.post("/", addTaskList);
router.delete("/:id", deleteList);
router.get("/items/:id", getListItems);
router.patch("/items/:id", addListItem);
router.patch("/items/update/:id", changeListItemStatus);
router.delete("/items/:id", deleteListItemStatus);

module.exports = router;
