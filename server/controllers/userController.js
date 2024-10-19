import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import User from '../models/User.model.js';
import bcrypt from "bcrypt";

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
    const isMatch = await bcrypt.compare(password, user.password); // Assuming you have a comparePassword method in your User model
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


// Create a user with Form
export async function registerUserWithForm(req, res) {
  try {
    const { parsedProfileUser, file } = req.body;
    const profileUser = JSON.parse(parsedProfileUser);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: profileUser.email });
    if (existingUser) {
      console.log("User exists");
      return res
        .status(401)
        .send({ msg: "User with the given email already exists" });
    } else {
      console.log("User does not exist");
    }

    // Hash the password using bcrypt with salt rounds (e.g., 10)
    const hashedPassword = await bcrypt.hash(profileUser.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      lastName: profileUser.lastName,
      firstName: profileUser.firstName,
      address: profileUser.address || "null",
      profile: file || "null", // Set to null if not provided
      email: profileUser.email,
      password: hashedPassword, // Use the hashed password here
    });

    // Save the user to the database
    await user.save();

    // Respond with success
    res.status(201).send({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}
