// routes/jobRoutes.js
const express = require('express');
const authenticateCompany = require('../middleware/authenticateCompany');
const pool = require('../db');

const router = express.Router();

// Create a new job posting
router.post('/create', authenticateCompany, async (req, res) => {
    const { title, location, salary, other_role } = req.body;
    const companyName = req.company.name; // Access company name using req.company.name

    try {
        await pool.execute(
            'INSERT INTO jobs (company_name, title, location, salary, other_role) VALUES (?, ?, ?, ?, ?)',
            [companyName, title, location, salary, other_role]
        );

        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get jobs with optional search parameters
router.get('/get', async (req, res) => {
    try {
        let query = 'SELECT * FROM jobs';

        // Check if search parameters are provided
        if (req.query.term || req.query.location) {
            query += ' WHERE';

            // Add search conditions to the query
            if (req.query.term) {
                query += ` title LIKE '%${req.query.term}%'`;
            }

            if (req.query.location) {
                query += `${req.query.term ? ' AND' : ''} location LIKE '%${req.query.location}%'`;
            }
        }

        const [jobs] = await pool.execute(query);

        if (!jobs.length) {
            return res.status(400).send("Jobs list is empty");
        }

        res.json(jobs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Delete a job by ID
router.delete('/delete/:id', authenticateCompany, async (req, res) => {
    const jobId = req.params.id;

    try {
        const [existingJob] = await pool.execute('SELECT * FROM jobs WHERE id = ?', [jobId]);

        if (existingJob.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await pool.execute('DELETE FROM jobs WHERE id = ?', [jobId]);

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
