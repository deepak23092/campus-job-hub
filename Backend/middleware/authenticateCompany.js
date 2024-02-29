const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateCompany = async (req, res, next) => {
    const token = req.header('auth-Token');

    if (!token) {
        return res.status(401).json("Please authenticate using a valid token");
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const companyId = decodedToken.user.id;

        const [companyData] = await pool.execute('SELECT * FROM companies WHERE id = ?', [companyId]);

        if (companyData.length === 0) {
            return res.status(401).json("Invalid company");
        }

        req.company = companyData[0];
        next();

    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json("Please authenticate using a valid token");
    }
};

module.exports = authenticateCompany;
