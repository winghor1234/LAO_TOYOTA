// layout.jsx
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getToken, removeToken } from '../utils/Token';
import Sidebar from '../pages/Sidebar';
import Header from '../pages/Header';


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!getToken()) {
        removeToken();
        window.location.href = "/login";
      }
    }, 5000); // เช็คทุก 5 วินาที

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex h-screen bg-[#E2E8F0] relative overflow-hidden ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-0">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-2 lg:p-4 overflow-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;