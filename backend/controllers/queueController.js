const Booking = require("../models/Booking");

// 👉 Get queue by center
const getQueueByCenter = async (req, res) => {
  try {
    const { centerId } = req.params;

    const bookings = await Booking.find({ serviceCenterId: centerId })
      .sort({ createdAt: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Move to next customer
const nextCustomer = async (req, res) => {
  try {
    const { centerId } = req.params;

    const bookings = await Booking.find({ serviceCenterId: centerId })
      .sort({ createdAt: 1 });

    // complete current
    const current = bookings.find(b => b.status === "serving");
    if (current) {
      current.status = "completed";
      await current.save();
    }

    // move next
    const next = bookings.find(b => b.status === "waiting");
    if (next) {
      next.status = "serving";
      await next.save();
    }

    res.json({ message: "Moved to next" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Get queue details by booking ID (FOR USER PAGE)
const getQueueById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const allBookings = await Booking.find({
      serviceCenterId: booking.serviceCenterId
    }).sort({ createdAt: 1 });

    const index = allBookings.findIndex(
      b => b._id.toString() === id
    );

    const peopleAhead = allBookings
      .slice(0, index)
      .filter(b => b.status !== "completed").length;

    const estimatedWaitingTime = peopleAhead * 5;

    res.json({
      name: booking.name,
      status: booking.status,
      position: index + 1,
      peopleAhead,
      estimatedWaitingTime
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getQueueByCenter,
  nextCustomer,
  getQueueById
};