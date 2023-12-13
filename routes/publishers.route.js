const express = require("express");
const Publisher = require("../models/publishers.schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    Publisher.find()
      .then((publishers) => {
        console.log(publishers);
        res.status(200).json({ publishers: publishers });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Failed to fetch publishers" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to fetch publishers from Database" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Publisher.findById(id)
      .then((Publisher) => {
        console.log(Publisher);
        res.status(200).json({ Publisher: Publisher });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to get Publisher. Check Id" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get Publisher" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPublisher = new Publisher(req.body);
    await newPublisher
      .save()
      .then((newPublisher) => {
        console.log(newPublisher);
        res.status(200).json({ msg: "Publisher added successfully" });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.publishersName) {
          res.status(500).json({ msg: "Publisher already exist" });
        }
        res.status(500).json({ msg: "Publisher failed to add" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to add Publisher" });
  }
});
// Update Publisher by Id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPublisher = req.body;
    await Publisher.findOneAndUpdate({ _id: id }, updatedPublisher, {
      new: true,
    })
      .then((updatedPublisher) => {
        console.log(updatedPublisher);
        res.status(200).json({
          msg: "Publisher updated successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Update Publisher failed" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to update Publisher" });
  }
});
// Delete Publisher by Id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPublisher = req.body;
    await Publisher.findOneAndDelete({ _id: id }, deletedPublisher, {
      new: true,
    })
      .then((deletedPublisher) => {
        console.log(deletedPublisher);
        res.status(200).json({
          msg: "Publisher deleted successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Delete Publisher failed" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to delete Publisher" });
  }
});
module.exports = router;
