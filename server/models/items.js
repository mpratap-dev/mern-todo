const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  label: String,
  done: Boolean
});

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item, itemSchema };
