export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
      <div>
        <h2 className="text-3xl font-bold text-teks">{title}</h2>
        <p className="text-teks-samping text-sm mt-1 font-medium">
           <span className="text-primary">{breadcrumb}</span>
        </p>
      </div>
      <div className="mt-4 md:mt-0">{children}</div>
    </div>
  );
}   