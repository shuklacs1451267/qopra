import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

type SidebarProps = {
  open: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, closeSidebar }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <ul>
          <li><button className="sidebar-btn" onClick={() => { closeSidebar(); scrollTo("hero"); }}>Home</button></li>
          <li><button className="sidebar-btn" onClick={() => { closeSidebar(); scrollTo("services"); }}>Services</button></li>
          <li><button className="sidebar-btn" onClick={() => { closeSidebar(); scrollTo("demo"); }}>Platform</button></li>
          <li><button className="sidebar-btn" onClick={() => { closeSidebar(); scrollTo("contact"); }}>Contact</button></li>
          <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
