const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

// const itemRoutes = require("./routes/items");
const listRoutes = require("./routes/lists");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use('/lists', listRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todoList');  
}

main().catch(err => console.log(err));

app.listen(PORT, () =>  console.log(`✅ App listening on port ${PORT} ✅`));
