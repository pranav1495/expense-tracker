import { useState } from 'react';
import axios from 'axios';
import {
  FaPlus, FaReceipt, FaRupeeSign, FaTags,
  FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft
} from 'react-icons/fa';

function ExpenseForm({ onAdd, onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    placedAt: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:5000/api/expenses',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    onAdd(res.data);
    setFormData({ title: '', amount: '', category: '', date: '', placedAt: '' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('❌ Failed to add expense');
  }
};


  return (
    <div className="card shadow-lg border-0 p-4 mb-4 mt-5 animate-slidein rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-success d-flex align-items-center gap-2 mb-0">
          <FaReceipt /> Add New Expense
        </h5>
        <button
          onClick={onBack}
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {[
          { name: 'title', icon: <FaReceipt />, placeholder: 'Expense Title', type: 'text' },
          { name: 'amount', icon: <FaRupeeSign />, placeholder: 'Amount in ₹', type: 'number' },
          { name: 'category', icon: <FaTags />, placeholder: 'Category (e.g. Food, Rent)', type: 'text' },
          { name: 'placedAt', icon: <FaMapMarkerAlt />, placeholder: 'Item is placed at (e.g. Amazon)', type: 'text' },
          { name: 'date', icon: <FaCalendarAlt />, placeholder: '', type: 'date' }
        ].map((field, idx) => (
          <div className="input-group mb-3" key={idx}>
            <span className="input-group-text">{field.icon}</span>
            <input
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="form-control"
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
          <FaPlus /> Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
