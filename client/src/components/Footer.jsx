import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto shadow-sm mt-5">
      <div className="container">
        <p className="mb-1 small">
          Made with <FaHeart color="red" className="mx-1" /> by <strong>Pranav Eswar</strong>
        </p>
        <div>
          <a href="https://github.com/pranav1495" target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/k-pranav-eswar1/" target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
            <FaLinkedin size={18} />
          </a>
        </div>
        <small className="d-block mt-2">© {new Date().getFullYear()} Expense Tracker. All rights reserved.</small>
      </div>
    </footer>
  );
}


export default Footer;