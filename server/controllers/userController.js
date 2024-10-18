import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import User from '../models/User.model.js';

// Get user by username and password
export async function authUser(req, res) {
  const { email, password } = req.body; // Access username and password directly from req.body
  try {
    // Find user by username
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      // If user not found, return 401 Unauthorized
      return res.status(401).json({ error: "Wrong username or password" });
    }

    // Verify the password (assuming the password is hashed, use bcrypt for comparison)
    const isMatch = await user.comparePassword(password); // Assuming you have a comparePassword method in your User model
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Wrong username or password" });
    }

    // User exists and password matches, generate a JWT
    const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ msg: "Login successful", user, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}