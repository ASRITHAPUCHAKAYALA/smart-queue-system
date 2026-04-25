const Booking = require("../models/Booking");

// 👉 Serve Next User
const serveNextUser = async (req, res) => {
  try {
    const { centerId } = req.body;

    // find first waiting user (FIFO)
    const nextUser = await Booking.findOne({
      centerId,
      status: "waiting",
    }).sort({ createdAt: 1 });

    if (!nextUser) {
      return res.json({ message: "No users in queue" });
    }

    nextUser.status = "serving";
    await nextUser.save();

    res.json({
      message: "User is now being served",
      user: nextUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👉 Mark Completed
const completeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Booking.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "completed";
    await user.save();

    res.json({
      message: "User marked as completed",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { serveNextUser, completeUser };