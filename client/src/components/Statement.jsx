import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import StatementList from '../components/StatementList';

function Statement() {
  const [expenses, setExpenses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
        console.error('Failed to fetch expenses:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, [token, navigate]);

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
        onTabChange={(tab) => {
          if (tab === 'statement') navigate('/statement');
        }}
      />

      <div className="container my-4 flex-grow-1">
        <StatementList expenses={expenses} />
      </div>

      <Footer />
    </div>
  );
}

export default Statement;
