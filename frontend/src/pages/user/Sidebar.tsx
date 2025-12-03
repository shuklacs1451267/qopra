import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";

type SidebarProps = {
  open: boolean;
  closeSidebar: () => void;
  userName: string;
  userImage: string;
};

const Sidebar: React.FC<SidebarProps> = ({ open, closeSidebar, userName, userImage }) => {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-profile">
          <img src={userImage} alt="Profile" className="sidebar-profile-img" />
          <span>{userName}</span>
        </div>
        <ul>
          <li><Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link></li>
          <li><Link to="/campaigns" onClick={closeSidebar}>Campaigns</Link></li>
          <li><Link to="/reports" onClick={closeSidebar}>Reports</Link></li>
          <li><Link to="/credits" onClick={closeSidebar}>Credits</Link></li>
          <li><Link to="/templates" onClick={closeSidebar}>Templates</Link></li>
          <li><Link to="/settings" onClick={closeSidebar}>Settings</Link></li>
          <li><Link to="/logout" onClick={closeSidebar}>Logout</Link></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
