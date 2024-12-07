import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { useAuth } from "../hooks/api/useAuth";

const MemberLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth()
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar show={isSidebarOpen}>
        <SidebarItem 
          route="/member" 
          label="Programs" 
          onClick={ () => navigate("/member") } 
          />
        <SidebarItem
          route="/member/bookings"
          label="Bookings"
          onClick={ () => navigate("/member/bookings") } 
          />
        <SidebarItem
          label="Logout"
          onClick={logoutHandler}
          />
      </Sidebar>
      <div className={`flex-1 flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <Navbar 
          onClickSidebar={(e) => setSidebarOpen(e.target.isSidebarOpen)} 
          title="Member" 
          isSidebarOpen={isSidebarOpen}
          />
        {/* Content */}
        <div className="flex-1 overflow-auto transition-all duration-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MemberLayout;