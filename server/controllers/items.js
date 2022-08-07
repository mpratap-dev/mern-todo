const { Item } = require("../models/items");
const { DEFAULT_ITEM } = require("../constants/items");
const { addItem } = require("../utils/items");

const getTodoItems = async (req, res) => {
  try {
    const data = await Item.find();
    if(!data.length) await addItem(DEFAULT_ITEM);
    res.json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
}

const addToDoItem = async (req, res) => {
  try {
    const { item } = req.body;
    await addItem(item);
    res.json({ status: true, message: "Item added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, status: false });
  }
}

const changeItemStatus = async (req, res) => {
  try {
    const { done } = req.body;
    const { id } = req.params;
    await Item.findOneAndUpdate({ _id: id }, { done });
  
    res.json({ status: true, message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, status: false });
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findOneAndRemove({ _id: id })
    res.json({ status: true, message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, status: false });
  }
}

module.exports = { getTodoItems, addToDoItem, changeItemStatus, deleteItem };
