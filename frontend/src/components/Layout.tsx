import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout">
      <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile} />

      {isMobile && <Sidebar open={sidebarOpen} closeSidebar={closeSidebar} />}

      {sidebarOpen && isMobile && (
        <button
          className="overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}



      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
