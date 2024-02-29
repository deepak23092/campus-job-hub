const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        throw err;
    } else {
        console.log("Connected to MySQL successfully");
        connection.release(); // Release the connection immediately to put it back in the pool
    }
});

module.exports = pool.promise(); // Using promise() to utilize async/await syntax