import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StatementList({ expenses = [] }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filtered, setFiltered] = useState(expenses);
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!fromDate || !toDate) {
      alert('Please select both dates');
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const filteredExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate >= from && expDate <= to;
    });

    setFiltered(filteredExpenses);
  };

  const displayData = filtered.length || (fromDate && toDate) ? filtered : expenses;

  if (!Array.isArray(expenses)) {
    return <p className="text-danger">Invalid data</p>;
  }

  return (
    <div className="card shadow p-4 mt-3 animate-fadein">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h5 className="text-success m-0">📘 Home Statement</h5>
        <span className="badge bg-primary">
          {displayData.length} transaction{displayData.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Date Filter Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">From:</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">To:</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-success w-100" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>

      {displayData.length === 0 ? (
        <p className="text-muted text-center">No transactions found for the selected range.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-success">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Placed At</th>
                <th className="text-end">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((exp) => (
                <tr key={exp._id}>
                  <td>{new Date(exp.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}</td>
                  <td>{exp.title}</td>
                  <td>
                    <span className="badge bg-info text-dark">{exp.category}</span>
                  </td>
                  <td>{exp.placedAt || <span className="text-muted">—</span>}</td>
                  <td className="text-end text-danger fw-bold">₹{Number(exp.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-4 text-center">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default StatementList;
