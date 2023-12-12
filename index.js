const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Contact = require("./routes/contact");
app.use("/api", Contact);

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/calendar");
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectToDB();

const port = 3000;
app.listen(port, () => {
  console.log("Server is running");
});
