const Center = require("../models/Center");

const getCenters = async (req, res) => {
  try {
    const { type } = req.query;

    const centers = await Center.find({ type });

    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCenters };