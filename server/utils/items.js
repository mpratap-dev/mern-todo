const { Item } = require("../models/items");

const addItem = async (label) => {
  const item = new Item({ label });
  const response = await item.save();
  return response;
}

module.exports = { addItem };
