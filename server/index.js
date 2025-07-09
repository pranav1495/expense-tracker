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
  origin: 'http://localhost:3000',  // your frontend origin
  credentials: true
}));

app.use(express.json());

// Check for missing MONGO_URI
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/expenses', require('./Routes/expenseRoutes'));

// Optional: Health check route
app.get('/api/ping', (req, res) => {
  res.send({ message: '✅ Server is up and running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
