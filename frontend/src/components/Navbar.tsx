import React from "react";
import "../styles/Navbar.css";

type NavbarProps = {
  toggleSidebar: () => void;
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          <li>
            <button className="nav-btn" onClick={() => scrollTo("hero")}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-btn" onClick={() => scrollTo("services")}>
              Services
            </button>
          </li>
          <li>
            <button className="nav-btn" onClick={() => scrollTo("demo")}>
              Platform Demo
            </button>
          </li>
          <li>
            <button className="nav-btn" onClick={() => scrollTo("contact")}>
              Contact
            </button>
          </li>
          <li>
            <a href="/login" className="login-btn">Login</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
