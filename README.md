# 🏠 Home Expense Tracker (MERN Stack)

A modern and responsive Home Expense Tracker built using the **MERN stack** to help home users manage their daily, weekly, and monthly expenses effectively. Includes authentication, expense logging, filtering, and financial summaries.

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (via MongoDB Atlas or local)

---

## 📦 Features

- 👤 User registration and login with encrypted passwords
- ➕ Add, view, update, and delete expenses
- 📅 Filter expenses by date
- 🧾 Expense entries include: `title`, `amount`, `category`, `placedAt`, `date`
- 📊 View summaries: daily, weekly, monthly, yearly
- 🔐 JWT-based authentication with protected routes

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

2. Setup Backend
   
```bash
cd server
npm install
```

3. Create a .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
FRONTEND_ORIGIN=http://localhost:3000
```

4. Run the backend:

```bash
npm start
```

5. Setup Frontend

```bash
cd ../client
npm install
```

6. Create a .env file:

```env
REACT_APP_API_URL=http://localhost:5000
```

7. Run the frontend:

```bash
npm start
```
