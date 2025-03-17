const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./schema');

const worstTitleSchema = new mongoose.Schema({
    worst_titles: Array,
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

router.get("/worst-titles", async (req, res) => {
    try {
        const titleData = await WorstTitle.find(); // Returns an array
        if (titleData.length > 0) {
            const allWorstTitles = titleData.flatMap(item => item.worst_titles); // Fixed field name
            res.json(allWorstTitles);
        } else {
            res.status(404).json({ message: "No worst titles found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching worst titles" });
    }
});


module.exports = router;