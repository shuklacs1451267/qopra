import React, { type ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
  userName: string;
  userImage: string;
};

const Layout: React.FC<LayoutProps> = ({ children, userName, userImage }) => {
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

  return (
    <div className="layout">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} userName={userName} userImage={userImage} />
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} userName={userName} userImage={userImage} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
