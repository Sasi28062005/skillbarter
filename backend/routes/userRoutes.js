const express = require('express');
const User = require('../models/User');  // Import User model
const router = express.Router();

// Route: Create User (Signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password ,skills} = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Create new user
        user = new User({ name, email, password ,skills});
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
router.get('/users', async (_req, res) => {
  try {
      console.log("Fetching all users...");
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server Error' });
  }
});
router.get("/users/name/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name:req.params.name});
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
      const { name, email,password, skills } = req.body;
      const newUser = new User({ name, email,password, skills });
      await newUser.save();
      res.json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
router.put("/users/name/:name", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { name: req.params.name },  // Find user by name
      { $set: req.body },  
      { new: true, runValidators: true } // Return updated user and validate changes
    );
    if (!updatedUser)
       return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

console.log("User routes loaded");
module.exports = router;



