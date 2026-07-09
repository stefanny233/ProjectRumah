import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import dataApotek from "../data/dataApotek.json";
import { 
  MdMenu, MdPersonAddAlt1, MdOutlineQrCodeScanner, 
  MdNotificationsNone, MdAdd, MdRemove, MdSearch, 
  MdShoppingCart, MdCheckCircle, MdClose, MdPrint
} from "react-icons/md";

export default function Dispenser() {
  const parsePrice = (val) => {
    if (typeof val === "number") return val;
    const cleaned = String(val || "").replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  };

  const formatRupiah = (num) => "Rp " + Number(num || 0).toLocaleString("id-ID");

  const combineUnique = (arr1, arr2) => {
    const combined = [...arr1, ...arr2];
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      const key = `${item.name}-${item.code || item.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  };

  const loadLocalProducts = () => {
    const localSaved = JSON.parse(localStorage.getItem("local_products") || "[]");
    const jsonProducts = dataApotek.products || [];
    const all = combineUnique(localSaved, jsonProducts);
    return all.map(p => ({ ...p, priceNumeric: parsePrice(p.price) }));
  };

  // State Manajemen Data Staf yang Sedang Login
  const [loggedInUser, setLoggedInUser] = useState("Admin Apotek");
  const [loggedInRole, setLoggedInRole] = useState("Admin");

  const [products, setProducts] = useState(loadLocalProducts);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("Walking Customer");
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Ambil sesi login dari localStorage saat halaman dibuka
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");
    if (storedName) setLoggedInUser(storedName);
    if (storedRole) setLoggedInRole(storedRole);
  }, []);

  // Sync Supabase di background dan gabungkan dengan JSON
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        const localSaved = JSON.parse(localStorage.getItem("local_products") || "[]");
        const jsonProducts = dataApotek.products || [];
        
        let allProducts;
        if (!error && data && data.length > 0) {
          allProducts = combineUnique([...localSaved, ...data], jsonProducts);
        } else {
          allProducts = combineUnique(localSaved, jsonProducts);
        }
        setProducts(allProducts.map(p => ({ ...p, priceNumeric: parsePrice(p.price) })));
      } catch (err) {
        console.warn("Offline, menggunakan data lokal.");
      }
    };
    fetchLatest();
  }, []);

  // Update daftar produk lokal bila ada perubahan di localStorage secara dinamis
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(loadLocalProducts());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.type || p.category).filter(Boolean))];

  const getProductImage = (name, type) => {
    const t = (type || "").toLowerCase();
    const n = (name || "").toLowerCase();
    if (t.includes("syrup") || t.includes("liquid") || n.includes("syrup")) {
      return "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=300&q=80";
    }
    if (t.includes("ointment") || t.includes("cream") || t.includes("gel") || t.includes("salep")) {
      return "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&q=80";
    }
    if (t.includes("tablet") || t.includes("capsule") || t.includes("caplet") || n.includes("tablet")) {
      return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80";
    }
    return "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=300&q=80";
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === product.id);
      return exist 
        ? prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.id === productId);
      if (!exist) return prev;
      return exist.quantity === 1
        ? prev.filter(item => item.product.id !== productId)
        : prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteFromCart = (productId) => setCart(prev => prev.filter(item => item.product.id !== productId));
  const resetCart = () => {
    setCart([]); setDiscount(0); setPaidAmount(""); setCustomerName("Walking Customer");
  };

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === "All" || (p.type || p.category) === activeTab;
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.code?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const netTotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);
  const finalTotal = Math.max(0, netTotal - discount);
  const paidVal = paidAmount === "" ? 0 : Number(paidAmount);
  const dueOrChange = paidVal - finalTotal;

  const handleSaveTransaction = () => {
    if (cart.length === 0) return alert("⚠️ Keranjang belanja kosong!");
    setReceiptData({
      transactionId: "TX-" + Math.floor(100000 + Math.random() * 900000),
      customerName, items: cart, netTotal, discount, finalTotal,
      paidAmount: paidVal || finalTotal, change: Math.max(0, dueOrChange), paymentType,
      date: new Date().toLocaleString("id-ID")
    });
    setShowReceipt(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FB] text-gray-600 p-2 select-none">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        
        {/* TOP BAR / HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600"><MdMenu size={22} /></button>
            <button onClick={resetCart} className="bg-[#28B95E] hover:bg-[#209f4e] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">New Sale</button>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-gray-600"><MdOutlineQrCodeScanner size={22} /></button>
            <div className="relative">
              <button className="text-gray-400 hover:text-gray-600"><MdNotificationsNone size={22} /></button>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </div>
            
            {/* DYNAMIC PROFILE SECTION */}
            <div className="flex items-center gap-2.5 border-l border-gray-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-teal-900 text-amber-400 flex items-center justify-center font-bold text-xs shadow-sm">
                {loggedInUser.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight">{loggedInUser}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{loggedInRole} ▾</p>
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-normal text-gray-500">Point Of Sale</h2>
          <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-xl font-bold border border-blue-100 flex items-center gap-1">
            <MdShoppingCart size={14} /> {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-1.5 text-xs font-bold rounded-md whitespace-nowrap cursor-pointer ${activeTab === cat ? "bg-[#3b52f6] text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-250"}`}>{cat}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-300"><MdSearch size={16} /></span>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari obat..." className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none" />
              </div>
              <div className="relative flex items-center">
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-4 pr-10 py-2 text-xs font-bold text-gray-400 focus:outline-none" />
                <button className="absolute right-1.5 p-1.5 bg-[#3b52f6] text-white rounded-md cursor-pointer"><MdPersonAddAlt1 size={14} /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col relative group">
                  <div className="h-24 bg-gray-100 relative flex items-center justify-center">
                    <img src={getProductImage(p.name, p.type || p.category)} alt={p.name} className="w-full h-full object-cover" />
                    <button onClick={() => addToCart(p)} className="absolute bottom-2 right-2 w-5 h-5 bg-white text-gray-400 rounded flex items-center justify-center shadow-xs hover:text-green-500 cursor-pointer"><MdAdd size={14} /></button>
                  </div>
                  <div className="p-2 text-left bg-white">
                    <p className="text-[11px] font-bold text-gray-700 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{formatRupiah(p.priceNumeric)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
                <h3 className="text-sm font-bold text-gray-700">Overview</h3>
                <span className="text-[10px] font-bold text-gray-300">Struk Aktif</span>
              </div>
              <div className="grid grid-cols-4 text-[10px] font-bold text-gray-300 uppercase mb-2">
                <span className="col-span-2">Nama Obat</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
              </div>
              <div className="flex flex-col gap-3.5 max-h-[240px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-center py-10 text-gray-300 text-xs">Keranjang Belanja Kosong</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-4 items-center text-xs text-gray-600">
                      <div className="col-span-2 text-left pr-1">
                        <p className="font-bold text-gray-700 truncate">{item.product.name}</p>
                        <p className="text-[9px] text-gray-400">{formatRupiah(item.product.priceNumeric)}</p>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 bg-gray-50 border border-gray-100 rounded py-0.5 px-1 w-max mx-auto">
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-gray-600 cursor-pointer"><MdRemove size={10} /></button>
                        <span className="text-[10px] font-bold text-gray-700">{item.quantity}</span>
                        <button onClick={() => addToCart(item.product)} className="text-gray-300 hover:text-gray-600 cursor-pointer"><MdAdd size={10} /></button>
                      </div>
                      <div className="text-right font-bold text-gray-700 flex items-center justify-end gap-1.5">
                        <span>{formatRupiah(item.product.priceNumeric * item.quantity)}</span>
                        <button onClick={() => deleteFromCart(item.product.id)} className="text-gray-300 hover:text-rose-500 font-bold cursor-pointer">✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-gray-50 pt-4">
              <h4 className="text-[10px] font-bold text-gray-300 uppercase mb-3">Payment</h4>
              <div className="flex flex-col gap-2 text-xs text-gray-400 pb-4">
                <div className="flex justify-between text-gray-600"><span>Sub Total</span><span className="font-bold text-gray-700">{formatRupiah(netTotal)}</span></div>
                <div className="flex justify-between items-center">
                  <span>Discount (Rp)</span>
                  <input type="number" value={discount || ""} onChange={(e) => setDiscount(e.target.value === "" ? 0 : parseInt(e.target.value))} className="w-24 bg-gray-50 border border-gray-100 rounded p-1 text-right text-xs focus:outline-none" placeholder="0" />
                </div>
                <div className="flex justify-between text-gray-600 font-bold"><span>Total Tagihan</span><span className="text-blue-600">{formatRupiah(finalTotal)}</span></div>
                <div className="flex justify-between items-center">
                  <span>Jumlah Dibayar</span>
                  <input type="number" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} className="w-24 bg-gray-50 border border-gray-100 rounded p-1 text-right text-xs focus:outline-none" placeholder={finalTotal.toString()} />
                </div>
                <div className="flex justify-between"><span>Kembalian</span><span className={`font-bold ${dueOrChange >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{formatRupiah(Math.abs(dueOrChange))}</span></div>
                <div className="flex justify-between items-center mt-1">
                  <span>Tipe</span>
                  <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="bg-gray-50 border border-gray-100 rounded p-1 text-xs font-bold text-gray-500 focus:outline-none cursor-pointer">
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                    <option value="QRIS">QRIS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <button onClick={resetCart} className="bg-gray-50 text-gray-400 hover:bg-gray-100 font-bold py-2 rounded-xl text-xs cursor-pointer">Reset</button>
                <button onClick={handleSaveTransaction} className="col-span-2 bg-[#28B95E] text-white hover:bg-green-600 font-bold py-2 rounded-xl text-xs shadow-xs transition-colors cursor-pointer">Simpan Transaksi</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl relative animate-scaleUp text-left">
            <div className="flex flex-col items-center text-center pb-3 border-b border-gray-100">
              <span className="text-emerald-500 mb-1"><MdCheckCircle size={36} /></span>
              <h3 className="text-sm font-bold text-gray-800">Transaksi Berhasil</h3>
              <p className="text-[9px] text-gray-400">Bukti pembayaran digital</p>
            </div>
            <div className="text-xs space-y-3 pt-3 font-mono">
              <div className="flex justify-between text-[9px] text-gray-400"><span>{receiptData.transactionId}</span><span>{receiptData.date}</span></div>
              <div className="flex justify-between"><span>Pelanggan:</span><span className="font-bold text-gray-800">{receiptData.customerName}</span></div>
              <div className="border-y border-dashed border-gray-200 py-2">
                {receiptData.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-[11px] mb-1">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>{formatRupiah(item.product.priceNumeric * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 text-right">
                <div className="flex justify-between"><span>Sub Total:</span><span>{formatRupiah(receiptData.netTotal)}</span></div>
                {receiptData.discount > 0 && <div className="flex justify-between text-rose-500"><span>Diskon:</span><span>-{formatRupiah(receiptData.discount)}</span></div>}
                <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-1"><span>TOTAL:</span><span className="text-blue-600">{formatRupiah(receiptData.finalTotal)}</span></div>
                <div className="flex justify-between text-[10px]"><span>Metode:</span><span>{receiptData.paymentType}</span></div>
                <div className="flex justify-between text-[10px] text-emerald-600 font-bold"><span>Kembalian:</span><span>{formatRupiah(receiptData.change)}</span></div>
              </div>
              <div className="flex flex-col items-center pt-2">
                <div className="flex gap-0.5 h-6 w-32 bg-gray-700 px-1 py-0.5 rounded opacity-85">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="bg-white flex-1" style={{ opacity: i % 2 === 0 ? 0.1 : 0.9, width: i % 3 === 0 ? "2px" : "1px" }} />
                  ))}
                </div>
                <span className="text-[8px] text-gray-400 mt-1">{receiptData.transactionId}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              <button onClick={() => window.print()} className="flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-2 rounded-xl text-xs cursor-pointer"><MdPrint size={14} /> Print</button>
              <button onClick={() => { setShowReceipt(false); resetCart(); }} className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 rounded-xl text-xs cursor-pointer">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}