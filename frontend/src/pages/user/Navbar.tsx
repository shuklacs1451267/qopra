import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

type NavbarProps = {
  toggleSidebar: () => void;
  isMobile: boolean;
  userName: string;
  userImage: string;
};

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isMobile,
  userName,
  userImage
}) => {
  const navigate = useNavigate();

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
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/credits">Credits</Link></li>
          <li><Link to="/dashboard">Templates</Link></li>

          <li
            className="profile"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={userImage || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />
            <span>{userName}</span>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
