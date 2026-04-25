const express = require("express");
const router = express.Router();
const {
  serveNextUser,
  completeUser,
} = require("../controllers/adminController");

// Serve next
router.post("/admin/serve", serveNextUser);

// Complete user
router.put("/admin/complete/:id", completeUser);

module.exports = router;