// app.js

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});