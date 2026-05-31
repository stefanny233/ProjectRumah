import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    // Struktur flex-col utama agar Header berada mutlak di baris paling atas monitor
    <div className="flex flex-col min-h-screen w-full bg-[#F8F9FB] overflow-hidden">
      
      {/* ATAS: Header sekarang memanjang 100% mentok dari ujung ke ujung monitor */}
      <Header />
      
      {/* BAWAH: Dibagi menjadi dua bagian (Sidebar kiri dan Halaman utama kanan) */}
      <div className="flex-1 flex min-h-0 w-full">
        
        {/* KIRI: Sidebar bersih tanpa logo */}
        <Sidebar />
        
        {/* KANAN: Tempat render halaman web asli */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
        
      </div>

    </div>
  );
}