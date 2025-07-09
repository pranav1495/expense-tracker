import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../index.css';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sorted);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch expenses:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, [token, navigate]);

  const handleAdd = (newExpense) => {
    const updated = [newExpense, ...expenses];
    setExpenses(updated.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete expense:', err);
    }
  };

  const getSummary = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // ⏰ today at midnight

  let daily = 0, weekly = 0, monthly = 0, yearly = 0;

  expenses.forEach((exp) => {
    const expDate = new Date(exp.date);
    const expMidnight = new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate());

    if (expMidnight.getTime() === today.getTime()) {
      daily += exp.amount;
    }

    const diffInDays = (today - expMidnight) / (1000 * 60 * 60 * 24);
    if (diffInDays < 7 && diffInDays >= 0) {
      weekly += exp.amount;
    }

    if (
      expDate.getFullYear() === now.getFullYear() &&
      expDate.getMonth() === now.getMonth()
    ) {
      monthly += exp.amount;
    }

    if (expDate.getFullYear() === now.getFullYear()) {
      yearly += exp.amount;
    }
  });

  return { daily, weekly, monthly, yearly };
};

  const { daily, weekly, monthly, yearly } = getSummary();

  const handleTabChange = (tab) => {
    setSidebarOpen(false); // close sidebar on tab change
    switch (tab) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'statement':
        navigate('/statement');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className="app-container min-vh-100 d-flex flex-column">
      <Navbar
        onToggle={() => setShowForm(!showForm)}
        showForm={showForm}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        showSidebar={sidebarOpen}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        expenses={expenses}
        onTabChange={handleTabChange}
      />

      <div className="container my-4 flex-grow-1">
        {showForm ? (
          <ExpenseForm onAdd={handleAdd} onBack={() => setShowForm(false)} />
        ) : (
          <>
            <ExpenseList expenses={expenses} onDelete={handleDelete} />

            <div className="card shadow mt-4 p-3 bg-light rounded-4 animate-fadein">
              <h5 className="text-success mb-3">💡 Expense Summary</h5>
              <ul className="list-group">
                <li className="list-group-item">💸 <strong>Today:</strong> ₹{daily}</li>
                <li className="list-group-item">📅 <strong>This Week:</strong> ₹{weekly}</li>
                <li className="list-group-item">📆 <strong>This Month:</strong> ₹{monthly}</li>
                <li className="list-group-item">🗓️ <strong>This Year:</strong> ₹{yearly}</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
