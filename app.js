// app.js

const express = require('express');
const app = express();
const cors = require('cors')

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors())

app.use((req, res) => console.log("=======", process.env.PORT, req));

// Routes
app.use('/api', require('./routes'));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});