import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
localStorage.setItem('fullName', res.data.fullName);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid login credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Login</h3>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: '400px' }}
      >
        <input
          type="text"
          name="login"
          placeholder="Username or Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="mt-3 text-center">
          New user? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
