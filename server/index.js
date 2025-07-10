const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ───────────────────────────────────────────────────
// 1⃣ Load environment variables (.env)
// ──────────────────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// ──────────────────────────────────────────────────
// 2⃣ CORS: Allow dev & production + preflight
// ──────────────────────────────────────────────────
app.use(cors({
  origin: [FRONTEND_ORIGIN, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Pre-flight OPTIONS requests
app.options('*', cors());

// ──────────────────────────────────────────────────
// 3⃣ Middleware
// ──────────────────────────────────────────────────
app.use(express.json()); // Body parser

// ──────────────────────────────────────────────────
// 4⃣ MongoDB Connection
// ──────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────
// 5⃣ Routes
// ──────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

app.get('/api/ping', (_, res) => {
  res.json({ message: '✅ Server is up and running' });
});

// ──────────────────────────────────────────────────
// 6⃣ Start Server
// ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 CORS allowed: ${FRONTEND_ORIGIN}`);
});