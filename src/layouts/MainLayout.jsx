import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    // 1. Ganti min-h-screen menjadi h-screen agar tinggi LAYOUT MUTLAK pas se-monitor
    <div className="flex flex-col h-screen w-full bg-[#F8F9FB] overflow-hidden">
      
      {/* ATAS: Header memanjang 100% */}
      <Header />
      
      {/* BAWAH: Di-lock agar tidak bisa melar melebihi sisa tinggi monitor */}
      <div className="flex-1 flex h-full w-full overflow-hidden">
        
        {/* KIRI: Sidebar (Pastikan di dalamnya dikunci juga) */}
        <Sidebar />
        
        {/* KANAN: Tempat render halaman asli (Hanya area ini yang boleh scroll) */}
        <main className="flex-1 p-8 overflow-y-auto h-full">
          <Outlet />
        </main>
        
      </div>

    </div>
  );
}