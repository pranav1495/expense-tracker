const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const dotenv   = require('dotenv');

// ─────────────────────────────────────────────────────────────
// 1️⃣  Load environment variables (.env)
// ─────────────────────────────────────────────────────────────
dotenv.config();

const app   = express();
const PORT  = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;
const FRONT = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// ─────────────────────────────────────────────────────────────
// 2️⃣  CORS – allow dev & prod + pre‑flight
// ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: [FRONT, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle pre‑flight quickly
app.options('*', cors());

// ─────────────────────────────────────────────────────────────
// 3️⃣  JSON body parsing
// ─────────────────────────────────────────────────────────────
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// 4️⃣  MongoDB connection
// ─────────────────────────────────────────────────────────────
if (!MONGO) {
  console.error('❌  MONGO_URI missing in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO)
  .then(() => console.log('✅  MongoDB connected'))
  .catch(err => {
    console.error('❌  MongoDB error:', err.message);
    process.exit(1);
  });

// ─────────────────────────────────────────────────────────────
// 5️⃣  Routes
// ─────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

app.get('/api/ping', (_, res) => res.json({ message: '✅ Server is up' }));

// ─────────────────────────────────────────────────────────────
// 6️⃣  Start server
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  API ready on :${PORT}`);
  console.log(`🟢  Accepting requests from → ${FRONT}`);
});
