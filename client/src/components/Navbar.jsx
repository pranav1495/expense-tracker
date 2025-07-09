import { FaBars, FaTimes, FaPlus } from 'react-icons/fa';

function Navbar({ onToggle, showForm, onSidebarToggle, showSidebar }) {
  return (
    <nav className="navbar bg-primary text-white px-4 py-3 fixed-top shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="m-0 d-flex align-items-center gap-2">
        💰 <span>Expense Dashboard</span>
      </h5>

      <div className="d-flex align-items-center gap-3">
        {!showForm && (
          <button className="btn btn-light btn-sm d-flex align-items-center gap-1" onClick={onToggle}>
            <FaPlus /> Add
          </button>
        )}
        <button
          onClick={onSidebarToggle}
          className="btn btn-sm btn-outline-light"
        >
          {showSidebar ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
