import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

type SidebarProps = {
  open: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, closeSidebar }) => {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <ul>

          {/* HOME PAGE SCROLL BUTTONS */}
          <li>
            <button className="sidebar-btn" onClick={() => { closeSidebar(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }}>
              Home
            </button>
          </li>

          <li>
            <button className="sidebar-btn" onClick={() => { closeSidebar(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}>
              Services
            </button>
          </li>

          <li>
            <button className="sidebar-btn" onClick={() => { closeSidebar(); document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" }); }}>
              Platform Demo
            </button>
          </li>

          <li>
            <button className="sidebar-btn" onClick={() => { closeSidebar(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Contact
            </button>
          </li>

          {/* REAL ROUTES */}
          <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
