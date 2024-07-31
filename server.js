const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demonstration purposes
let submissions = [];

// POST route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, mobile } = req.body;
  submissions.push({ name, email, mobile });
  console.log('Received data:', { name, email, mobile });
  res.status(200).send('Form submitted successfully!');
});

// GET route to retrieve all submissions
app.get('/submissions', (req, res) => {
  res.status(200).json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
