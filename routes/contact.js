const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const contact = require("../models/contact");

// Read contact from mongoDB
router.get("/contact", async (req, res) => {
  try {
    contact
      .find()
      .then((contacts) => {
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ msg: "Unable to find contact. Chek your id again" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get contacts" });
  }
});
// Read contact from mongodb by Id
router.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Contact.findById(id)
      .then((contact) => {
        console.log(contact);
        res.status(200).json({ msg: contact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to get contact. Check Id" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get contact" });
  }
});

// Read from mongoDB by search
router.get("/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log("searchTerm" + searchTerm);
  const searchRegex = new RegExp(searchTerm, "i");
  await Contact.find({
    $or: [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
    ],
  })
    .then((contact) => {
      console.log(contact);
      if (contact.length > 0) {
        res.status(200).json({ contact: contact });
      } else {
        res.status(200).json({ msg: "Nothing found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Nothing Found" });
    });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to search" });
  }
});

// Update contact by Id
router.put("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedContact = req.body;

    await Contact.findOneAndUpdate({ _id: id }, updatedContact, {
      new: true,
    })
      .then((updatedContact) => {
        console.log(updatedContact);
        res.status(200).json({
          msg: "Contact updated successfully",
          contact: updatedContact,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Update contact failed" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to update contact" });
  }
});
// Add contact to mongoDB
router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact
      .save()
      .then((savedContact) => {
        console.log(savedContact);
        res.status(200).json({ msg: "Contact successfully saved" });
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
