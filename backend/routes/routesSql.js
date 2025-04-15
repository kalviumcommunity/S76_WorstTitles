const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../Database/mysqlConection'); // Adjust path if needed

// Middleware
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
    (req, res) => {
        const { name, email, password } = req.body;
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, password], (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ id: result.insertId, name, email });
        });
    }
);

router.get('/users', (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
});

router.put('/users/:id',
    [
        param('id').isInt(),
        body('name').optional().notEmpty(),
        body('email').optional().isEmail(),
        body('password').optional().isLength({ min: 6 })
    ],
    validateRequest,
    (req, res) => {
        const { name, email, password } = req.body;
        const updates = [];
        const values = [];

        if (name) { updates.push('name = ?'); values.push(name); }
        if (email) { updates.push('email = ?'); values.push(email); }
        if (password) { updates.push('password = ?'); values.push(password); }

        if (updates.length === 0) return res.status(400).json({ message: 'No fields to update' });

        values.push(req.params.id);
        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User updated successfully' });
        });
    }
);

router.delete('/users/:id',
    [param('id').isInt()],
    validateRequest,
    (req, res) => {
        db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted successfully' });
        });
    }
);

// ----------------- WORST TITLE ROUTES -----------------

router.post("/worst-titles",
    [
        body('id').isInt({ min: 1 }),
        body('name').notEmpty(),
        body('category').notEmpty(),
        body('description').notEmpty(),
        body('created_by').isInt()
    ],
    validateRequest,
    (req, res) => {
        const { id, name, category, description, created_by } = req.body;

        db.query('SELECT * FROM users WHERE id = ?', [created_by], (err, users) => {
            if (err) return res.status(500).json({ message: err.message });
            if (users.length === 0) return res.status(400).json({ message: 'User not found' });

            db.query('SELECT * FROM worst_titles WHERE id = ?', [id], (err, titles) => {
                if (err) return res.status(500).json({ message: err.message });
                if (titles.length > 0) return res.status(400).json({ message: 'Title ID already exists' });

                const sql = 'INSERT INTO worst_titles (id, name, category, description, created_by) VALUES (?, ?, ?, ?, ?)';
                db.query(sql, [id, name, category, description, created_by], (err, result) => {
                    if (err) return res.status(500).json({ message: err.message });
                    res.status(201).json({ id, name, category, description, created_by });
                });
            });
        });
    }
);

router.get("/worst-titles", (req, res) => {
    const { created_by } = req.query;
    let sql = `SELECT wt.*, u.name AS user_name, u.email FROM worst_titles wt JOIN users u ON wt.created_by = u.id`;
    const values = [];

    if (created_by) {
        sql += ` WHERE created_by = ?`;
        values.push(created_by);
    }

    db.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "No worst titles found" });
        res.json(results);
    });
});

router.get("/worst-titles/:id",
    [param('id').isInt()],
    validateRequest,
    (req, res) => {
        const sql = `
            SELECT wt.*, u.name AS user_name, u.email 
            FROM worst_titles wt 
            JOIN users u ON wt.created_by = u.id 
            WHERE wt.id = ?
        `;
        db.query(sql, [req.params.id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            if (results.length === 0) return res.status(404).json({ message: "Title not found" });
            res.json(results[0]);
        });
    }
);

router.put("/worst-titles/:id",
    [
        param('id').isInt(),
        body('name').optional().notEmpty(),
        body('category').optional().notEmpty(),
        body('description').optional().notEmpty()
    ],
    validateRequest,
    (req, res) => {
        const { name, category, description } = req.body;
        const updates = [];
        const values = [];

        if (name) { updates.push('name = ?'); values.push(name); }
        if (category) { updates.push('category = ?'); values.push(category); }
        if (description) { updates.push('description = ?'); values.push(description); }

        if (updates.length === 0) return res.status(400).json({ message: 'No fields to update' });

        values.push(req.params.id);
        const sql = `UPDATE worst_titles SET ${updates.join(', ')} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Title not found" });
            res.json({ message: 'Title updated successfully' });
        });
    }
);

router.delete("/worst-titles/:id",
    [param('id').isInt()],
    validateRequest,
    (req, res) => {
        db.query('DELETE FROM worst_titles WHERE id = ?', [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Title not found" });
            res.json({ message: "Title deleted successfully" });
        });
    }
);

module.exports = router;
