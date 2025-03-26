const express = require('express');
const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const User = require('./schema');

const worstTitleSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    description: String
});

const WorstTitle = mongoose.model("worst_tittles", worstTitleSchema);

// Middleware for handling validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Create a new user (POST)
router.post('/users', 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id', 
    [
        param('id').isMongoId().withMessage('Invalid user ID'),
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('Invalid email format'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) return res.status(404).json({ message: "User not found" });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);


router.delete('/users/:id', 
    [param('id').isMongoId().withMessage('Invalid user ID')],
    validateRequest,
    async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.get("/worst-titles", async (req, res) => {
    try {
        const titleData = await WorstTitle.find();
        if (titleData.length > 0) {
            res.json(titleData);
        } else {
            res.status(404).json({ message: "No worst titles found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching worst titles" });
    }
});

router.post("/worst-titles", 
    [
        body('id').isInt().withMessage('ID must be a number'),
        body('name').notEmpty().withMessage('Name is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('description').notEmpty().withMessage('Description is required')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { id, name, category, description } = req.body;
            const newTitle = new WorstTitle({ id, name, category, description });
            await newTitle.save();
            res.status(201).json({ message: "Title added successfully", newTitle });
        } catch (error) {
            res.status(500).json({ message: "Error adding title" });
        }
    }
);

router.put("/worst-titles/:id", 
    [
        param('id').isMongoId().withMessage('Invalid title ID'),
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('category').optional().notEmpty().withMessage('Category cannot be empty'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const updatedTitle = await WorstTitle.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTitle) return res.status(404).json({ message: "Title not found" });
            res.status(200).json(updatedTitle);
        } catch (error) {
            res.status(500).json({ message: "Error updating title" });
        }
    }
);

router.delete("/worst-titles/:id", 
    [param('id').isMongoId().withMessage('Invalid title ID')],
    validateRequest,
    async (req, res) => {
        try {
            const deletedTitle = await WorstTitle.findByIdAndDelete(req.params.id);
            if (!deletedTitle) return res.status(404).json({ message: "Title not found" });
            res.status(200).json({ message: "Title deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting title" });
        }
    }
);

router.get("/worst-titles/:id", 
    [param('id').isMongoId().withMessage('Invalid title ID')],
    validateRequest,
    async (req, res) => {
        try {
            const title = await WorstTitle.findById(req.params.id);
            if (!title) return res.status(404).json({ message: "Title not found" });
            res.status(200).json(title);
        } catch (error) {
            res.status(500).json({ message: "Error fetching title" });
        }
    }
);

module.exports = router;
