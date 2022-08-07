const express = require('express');
const { getTodoItems, addToDoItem, changeItemStatus, deleteItem } = require("../controllers/items");
const router = express.Router();

router.get("/", getTodoItems);
router.post("/", addToDoItem);
router.patch('/:id', changeItemStatus);
router.delete('/:id', deleteItem);

module.exports = router;
