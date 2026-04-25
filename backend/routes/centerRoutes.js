const express = require("express");
const router = express.Router();
const { getCenters } = require("../controllers/centerController");

router.get("/centers", getCenters);

module.exports = router;