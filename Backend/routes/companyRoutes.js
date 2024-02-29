// src/routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Your MySQL connection pool
const authenticateCompany = require('../middleware/authenticateCompany');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new company
router.post('/signup', [
    body('name', 'Name cannot be empty').not().isEmpty(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
    body('description', 'Description must be at least 10 characters').isLength({ min: 10 }),
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { name, email, password, description, website } = req.body;

            // Check if user with the given email already exists
            const [existingCompany] = await pool.execute('SELECT * FROM companies WHERE email = ?', [email]);
            if (existingCompany.length > 0) {
                return res.status(400).json({ success: false, error: 'A company with this email already exists' });
            }

            // Hash password before storing in the database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const query = 'INSERT INTO companies (name, email, password, description, website) VALUES (?, ?, ?, ?, ?)';
            const [result] = await pool.execute(query, [name, email, hashedPassword, description, website]);

            const data = { user: { id: result.insertId } };
            const authToken = jwt.sign(data, JWT_SECRET);

            // Return 201 Created and the authToken
            res.status(201).json({ success: true, authToken });
        } catch (error) {
            console.error('Error in signup route:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
        }
    });

// Login as a company
router.post('/login', [
    body('email', 'Please enter a valid Email address!').isEmail(),
    body('password', 'Password must be atleast 5 characters!').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Fetch user details from MySQL based on the email
            const [user] = await pool.execute('SELECT * FROM companies WHERE email = ?', [email]);
            if (user.length === 0) {
                return res.status(401).json({ error: "Please try to login with correct credentials" });
            }

            const comparePass = await bcrypt.compare(password, user[0].password);
            if (!comparePass) {
                return res.status(401).json({ error: "Invalid Password!" });
            }

            const data = {
                user: {
                    id: user[0].id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        }

        catch (error) {
            console.error(error.message);
            res.status(500).json("Internal server error");
        }
    });

// Route to get details of the logged-in company
router.get('/getLoggedInCompany', authenticateCompany, async (req, res) => {
    try {
        // Use req.company to access details of the logged-in company
        res.status(200).json(req.company);
    } catch (error) {
        console.error('Error fetching company details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;