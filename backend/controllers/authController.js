const User = require("../models/User");

// 👉 Signup
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.json({ message: "User already exists" });
    }

    const user = new User({ username, password });
    await user.save();

    return res.json({ message: "Signup successful" }); // ✅ IMPORTANT
  } catch (error) {
    return res.status(500).json({ message: error.message }); // ✅ FIX HERE
  }
};

// 👉 Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };