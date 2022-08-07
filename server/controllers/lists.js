const List = require("../models/lists");

const getLists = async (req, res) => {
  try {
    const data = await List.find();
    res.json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const addTaskList = async (req, res) => {
  try {
    const { name } = req.body;
    const list = await List.findOne({ name });

    if (list) {
      res.status(400).json({ status: false, message: "List already exist" });
    } else {
      const item = new List({ name, items: [] });
      await item.save();
      res.json({ status: true, message: "List added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.findOneAndRemove({ _id: id });
    res.json({ status: true, message: "List deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
}

const getListItems = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await List.findOne({ _id: id });
    if (!response) {
      res.status(400).json({ status: false, message: "List not found" });
    } else {
      res.json({ status: true, data: response.items, list_name: response.name });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const addListItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { item } = req.body;
    const list = await List.findOne({ _id: id });
    if (list) {
      list.items.push({ label: item });
      console.log(list, item);
      await list.save();

      res.json({ status: true, message: "Item added to list successfully" });
    } else {
      res.status(400).json({ status: false, message: "List not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const changeListItemStatus = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    await List.findOneAndUpdate({ 'items._id': id }, { $set: { "items.$.done" : done } });
    res.json({ status: true, message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteListItemStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await List.findOneAndUpdate({ 'items._id': id }, { $pull: { items: { _id: id } } });
    res.json({ status: true, message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  addTaskList,
  addListItem,
  getLists,
  deleteList,
  getListItems,
  changeListItemStatus,
  deleteListItemStatus,
};
