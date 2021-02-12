const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const auth = require("./auth");

const productRoute = require("./routes/Product");
const UserRoute = require("./routes/User");
const OrderRoute = require("./routes/Order");
const CategoryRoute = require("./routes/Category");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/product", auth, productRoute);
app.use("/user", auth, UserRoute);
app.use("/order", auth, OrderRoute);
app.use("/category", auth, CategoryRoute);

// mongoose connection

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
  console.log("db is connected successfully.");
});

app.get("/", (req, res) => {
  res.send("all good");
});

app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`);
});
