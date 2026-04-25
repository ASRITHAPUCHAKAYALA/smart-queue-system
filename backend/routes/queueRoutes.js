const express = require("express");
const router = express.Router();

const {
  getQueueByCenter,
  nextCustomer,
  getQueueById
} = require("../controllers/queueController");

// 👉 Admin
router.get("/center/:centerId", getQueueByCenter);
router.put("/next/:centerId", nextCustomer);

// 👉 User
router.get("/:id", getQueueById);

module.exports = router;