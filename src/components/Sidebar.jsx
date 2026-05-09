import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdInventory,
  MdMedication,
} from "react-icons/md";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Employee", path: "/employee", icon: <MdPeople /> },
    { name: "Stock", path: "/stock", icon: <MdInventory /> },
    { name: "Product", path: "/product", icon: <MdMedication /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-garis flex flex-col">
      <div className="p-8">
        <h1 className="text-3xl font-black text-primary tracking-tighter uppercase">
          Apotek <span className="text-teks">QWU</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-primary-light text-primary font-bold shadow-sm"
                  : "text-teks-samping hover:bg-latar hover:text-primary"
              }`
            }
          >
            <span className="text-2xl mr-4">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
