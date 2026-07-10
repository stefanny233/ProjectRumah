import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8F9FB] overflow-hidden">
      
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex h-full w-full overflow-hidden relative">
        
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full w-full">
          <Outlet />
        </main>
        
      </div>

    </div>
  );
}