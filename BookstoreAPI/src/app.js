const express = require('express');
const mongoose = require('mongoose');

// Import routes
const authRoutes80 = require('./routes/auth.routes');
const bookRoutes80 = require('./routes/book.routes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes80);
app.use('/api/books', bookRoutes80);

// Basic route
app.get('/', (req, res) => {
  res.send('Bookstore API is running');
});

module.exports = app;