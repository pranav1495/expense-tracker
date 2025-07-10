// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1⃣ Load .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// 2⃣ CORS setup
app.use(cors({
  origin: [FRONTEND_ORIGIN, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors()); // Preflight support

// 3⃣ Middleware
app.use(express.json());

// 4⃣ MongoDB Connection
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set in .env file');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// 5⃣ Route mounting with logging for debugging
try {
  console.log('🔍 Loading authRoutes...');
  app.use('/api/auth', require('./routes/authRoutes'));

  console.log('🔍 Loading expenseRoutes...');
  app.use('/api/expenses', require('./routes/expenseRoutes'));

  console.log('🔍 Loading userRoutes...');
  app.use('/api/users', require('./routes/userRoutes'));
} catch (err) {
  console.error('❌ Route load error:', err);
  process.exit(1);
}

// 6⃣ Health check route
app.get('/api/ping', (_, res) => {
  res.json({ message: '✅ Server is up and running' });
});

// 7⃣ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Accepting requests from: ${FRONTEND_ORIGIN}`);
});
