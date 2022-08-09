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
  await mongoose.connect('mongodb+srv://pratap1995:pratap1995@devconnector.go1qu.mongodb.net/todoList?retryWrites=true&w=majority');  
}

main().then(() => console.log('☑️  MongoDB connected  ☑️')).catch(err => console.log(err));

app.listen(PORT, () =>  console.log(`✅ App listening on port ${PORT} ✅`));
