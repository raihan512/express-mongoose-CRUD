const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Contact = require("./routes/contact");
const Book = require("./routes/book.route");
const Publisher = require("./routes/publishers.route");
const connectDB = require("./utils/connectdb");
app.use("/api", Contact);
app.use("/api", Book);
app.use("/api/publisher", Publisher);

connectDB();
const port = 3000;
app.listen(port, () => {
  console.log("Server is running");
});
