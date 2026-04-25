const Booking = require("../models/Booking");

// 👉 Create Booking
const createBooking = async (req, res) => {
  try {
    const { name, serviceType, centerId } = req.body;

    if (!name || !serviceType || !centerId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const booking = new Booking({
  name,
  serviceType,
  serviceCenterId: centerId, // ✅ FIXED
});

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBooking };