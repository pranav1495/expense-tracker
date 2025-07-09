import './Sidebar.css';
import { FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ isOpen, onClose, expenses = [], onTabChange }) {
  const fullName = localStorage.getItem('fullName') || 'User';

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="mb-4">
          <h6 className="text-muted">Hi, <span className="fw-bold">{fullName}</span></h6>
        </div>
      <div className="sidebar-body p-3 overflow-auto">

        {/* Navigation Tabs */}
        <div className="list-group mb-4">
          <button onClick={() => onTabChange('statement')} className="list-group-item list-group-item-action">
            🧾Statement
          </button>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }} className="list-group-item list-group-item-action text-danger">
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
