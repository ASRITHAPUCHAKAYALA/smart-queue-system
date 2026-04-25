const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String, // hospital, bank, store
    required: true,
  },
serviceCenterId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Center",
  required: true,
},
  status: {
    type: String,
    enum: ["waiting", "serving", "completed"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);