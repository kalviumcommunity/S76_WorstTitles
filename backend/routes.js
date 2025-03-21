const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./schema');

const worstTitleSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    description: String
});

const WorstTitle = mongoose.model("worst_tittles", worstTitleSchema);

// Create a new user (POST)
router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users (GET)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a user by ID (PUT)
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a user by ID (DELETE)
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get worst movie titles (GET)
router.get("/worst-titles", async (req, res) => {
    try {
        const titleData = await WorstTitle.find(); // Returns an array
        if (titleData.length > 0) {
            res.json(titleData);
        } else {
            res.status(404).json({ message: "No worst titles found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching worst titles" });
    }
});

// Add new worst title (POST)
router.post("/worst-titles", async (req, res) => {
    try {
        const { id, name, category, description } = req.body;
        if (!id || !name || !category || !description) return res.status(400).json({ message: "All fields are required" });

        const newTitle = new WorstTitle({ id, name, category, description });
        await newTitle.save();

        res.status(201).json({ message: "Title added successfully", newTitle });
    } catch (error) {
        res.status(500).json({ message: "Error adding title" });
    }
});
// Update a worst title by ID (PUT)
router.put("/worst-titles/:id", async (req, res) => {
    try {
        const updatedTitle = await WorstTitle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTitle) return res.status(404).json({ message: "Title not found" });
        res.status(200).json(updatedTitle);
    } catch (error) {
        res.status(500).json({ message: "Error updating title" });
    }
});

// Delete a worst title by ID (DELETE)
router.delete("/worst-titles/:id", async (req, res) => {
    try {
        const deletedTitle = await WorstTitle.findByIdAndDelete(req.params.id);
        if (!deletedTitle) return res.status(404).json({ message: "Title not found" });
        res.status(200).json({ message: "Title deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting title" });
    }
});

// Get a worst movie title by ID (GET)
router.get("/worst-titles/:id", async (req, res) => {
    try {
        const title = await WorstTitle.findById(req.params.id);
        if (!title) return res.status(404).json({ message: "Title not found" });
        res.status(200).json(title);
    } catch (error) {
        res.status(500).json({ message: "Error fetching title" });
    }
});


module.exports = router;
