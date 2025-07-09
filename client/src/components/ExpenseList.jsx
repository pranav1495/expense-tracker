import { FaTrashAlt } from 'react-icons/fa';

function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="card shadow p-4 mt-5 animate-fadein">
      <h5 className="mb-4 text-primary">📋 Recent Expenses</h5>
      <ul className="list-group">
        {expenses.length === 0 ? (
          <li className="list-group-item text-center text-muted">No expenses to display.</li>
        ) : (
          expenses.map((expense) => (
            <li
              key={expense._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{expense.title}</strong><br />
                ₹{expense.amount} • {expense.category}<br />
                <small className="text-muted">📍 {expense.placedAt} | 📅 {new Date(expense.date).toLocaleDateString()}</small>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(expense._id)}
                title="Delete"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;
