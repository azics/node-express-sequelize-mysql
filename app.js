const express = require('express');
const app = express();
const multerMW = require('./midleware/multer.mw');

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use((req, res) => console.log("=======", process.env.PORT));

// Routes
app.use('/api', require('./routes'));
// app.use('/api', require('./routes'));

app.post('/upload', multerMW.single('file'), (req, res) => {
  try {
    res.status(201).json({ status: 'ok', message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ status: 'nok', error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});