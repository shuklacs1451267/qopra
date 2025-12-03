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
          <li><Link to="/" onClick={closeSidebar}>Home</Link></li>
          <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
          <li><Link to="/strategy" onClick={closeSidebar}>Strategy</Link></li>
          <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
          <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
