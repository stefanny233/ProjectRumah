// src/components/PageHeader.jsx
export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 mt-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">
          {breadcrumb}
        </p>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {children} {/* Tempat naruh tombol "Add Staff" atau "Cetak" */}
      </div>
    </div>
  );
}