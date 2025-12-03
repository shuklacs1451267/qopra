import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

type NavbarProps = {
  toggleSidebar: () => void;
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {
  return (
    <nav className="navbar">
      {isMobile && (
        <button className="menu-icon" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <div className="brand">Qopra</div>

      {!isMobile && (
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Features</Link></li>
          <li><Link to="/">Contact</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
