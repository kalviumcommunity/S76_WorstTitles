const express = require('express');
const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const User = require('./models/schema');
const WorstTitle = require('./models/title');

// Middleware for validation
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// ----------------- USER ROUTES -----------------

router.post('/users',
    [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
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
        const users = await User.find({}, 'name email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id',
    [
        param('id').isMongoId(),
        body('name').optional().notEmpty(),
        body('email').optional().isEmail(),
        body('password').optional().isLength({ min: 6 })
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
    [param('id').isMongoId()],
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

// ----------------- WORST TITLE ROUTES -----------------

// ✅ Create a worst title
router.post("/worst-titles",
    [
        body('id').isInt({ min: 1 }),
        body('name').notEmpty(),
        body('category').notEmpty(),
        body('description').notEmpty(),
        body('created_by').isMongoId().withMessage('Valid user ID required')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { id, name, category, description, created_by } = req.body;

            const user = await User.findById(created_by);
            if (!user) return res.status(400).json({ message: "User not found" });

            const existing = await WorstTitle.findOne({ id });
            if (existing) return res.status(400).json({ message: "Title ID already exists" });

            const newTitle = new WorstTitle({ id, name, category, description, created_by });
            await newTitle.save();

            res.status(201).json(newTitle);
        } catch (error) {
            res.status(500).json({ message: "Error adding title" });
        }
    }
);

// ✅ Get all worst titles (optional filter by created_by)
router.get("/worst-titles", async (req, res) => {
    try {
        const { created_by } = req.query;
        const query = created_by ? { created_by } : {};
        const titles = await WorstTitle.find(query).populate('created_by', 'name email');

        if (titles.length === 0) return res.status(404).json({ message: "No worst titles found" });

        res.status(200).json(titles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching worst titles" });
    }
});

// ✅ Get worst title by Mongo ID
router.get("/worst-titles/:id",
    [param('id').isMongoId()],
    validateRequest,
    async (req, res) => {
        try {
            const title = await WorstTitle.findById(req.params.id).populate('created_by', 'name email');
            if (!title) return res.status(404).json({ message: "Title not found" });
            res.status(200).json(title);
        } catch (error) {
            res.status(500).json({ message: "Error fetching title" });
        }
    }
);

// ✅ Update worst title
router.put("/worst-titles/:id",
    [
        param('id').isMongoId(),
        body('name').optional().notEmpty(),
        body('category').optional().notEmpty(),
        body('description').optional().notEmpty()
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

// ✅ Delete worst title
router.delete("/worst-titles/:id",
    [param('id').isMongoId()],
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

module.exports = router;
