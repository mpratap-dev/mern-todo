const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const listRoutes = require("./routes/lists");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/lists", listRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("../client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

async function main() {
  await mongoose.connect(
    "mongodb+srv://pratap1995:pratap1995@devconnector.go1qu.mongodb.net/todoList?retryWrites=true&w=majority"
  );
}

main()
  .then(() => console.log("☑️  MongoDB connected  ☑️"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`✅ App listening on port ${PORT} ✅`));
