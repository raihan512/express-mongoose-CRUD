const express = require("express");
const router = express.Router();
const Book = require("../models/book.schema");

// Add contact to mongoDB
router.post("/book", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook
      .save()
      .then((savedBook) => {
        console.log(savedBook);
        res.status(200).json({ msg: "Book successfully saved" });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.email) {
          res.status(500).json({ msg: "Email already exists" });
        } else {
          res.status(500).json({ msg: "Unable to save contact" });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to save" });
  }
});

module.exports = router;
