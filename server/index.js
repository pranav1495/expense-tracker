const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',                   // local dev
    'https://your-frontend.vercel.app'         // production frontend URL
  ],
  credentials: true
}));

app.use(express.json());

// Check for MONGO_URI
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/expenses', require('./Routes/expenseRoutes'));

// Health check
app.get('/api/ping', (req, res) => {
  res.send({ message: '✅ Server is up and running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
