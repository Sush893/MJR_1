const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const pool = require('../db');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// ✅ **User Signup Route**
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;

        // Check if email already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into DB
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash, bio) VALUES ($1, $2, $3, $4) RETURNING userid, name, email, bio, avatar_url',
            [name, email, hashedPassword, bio || '']
        );

        res.status(201).json({ message: 'Signup successful', user: newUser.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ **User Login Route**
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in DB
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userid: user.rows[0].userid }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, user: user.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ **Get User Profile (Protected)**
router.get('/', authenticate, async (req, res) => {
    try {
        const user = await pool.query('SELECT userid, name, email, bio, avatar_url FROM users WHERE userid = $1', [req.user.userid]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ **Update User Profile (Protected)**
router.patch('/', authenticate, async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        // Ensure new email isn't already taken
        const existingEmail = await pool.query('SELECT userid FROM users WHERE email = $1 AND userid != $2', [email, req.user.userid]);
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, email = $2, bio = $3 WHERE userid = $4 RETURNING userid, name, email, bio, avatar_url',
            [name, email, bio, req.user.userid]
        );

        res.json(updatedUser.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ **Upload Profile Picture (Protected)**
router.post('/avatar', authenticate, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const avatarPath = `uploads/avatars/${req.user.userid}.jpg`;

        // Resize and convert image to JPG
        await sharp(req.file.path)
            .resize(150, 150)
            .jpeg({ quality: 80 })
            .toFile(avatarPath);

        // Remove original uploaded file
        fs.unlinkSync(req.file.path);

        // Update avatar URL in DB
        const updatedUser = await pool.query(
            'UPDATE users SET avatar_url = $1 WHERE userid = $2 RETURNING avatar_url',
            [avatarPath, req.user.userid]
        );

        res.json({ message: 'Avatar updated', avatar_url: updatedUser.rows[0].avatar_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

module.exports = router;
