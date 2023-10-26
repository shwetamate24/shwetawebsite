const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 80;

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: '127.0.0.1', // Change this to your MySQL server host
    user: 'root', // Change this to your MySQL username
    password: '@IINTTMbV24', // Change this to your MySQL password
    database: 'feedback' // Change this to your MySQL database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('MySQL connection error: ' + err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static('public'));

// API endpoint to handle form submissions
app.post('/submit-feedback', (req, res) => {
    const { email, first_name, last_name, message } = req.body;

    // Insert the form data into the database
    const sql = 'INSERT INTO feedback (email, first_name, last_name, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [email, first_name, last_name, message], (err, result) => {
        if (err) {
            console.error('MySQL insertion error: ' + err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Form data inserted into MySQL database');
            res.status(200).json({ message: 'Form submitted successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
