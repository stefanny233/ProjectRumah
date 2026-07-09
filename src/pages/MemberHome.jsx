import React, { useState, useEffect } from "react";
import { Phone, MapPin } from "lucide-react";
import { supabase } from "../supabaseClient";

import MemberNavbar    from "../components/member/MemberNavbar";
import MemberTabs      from "../components/member/MemberTabs";
import MemberHero      from "../components/member/MemberHero";
import StatCards       from "../components/member/StatCards";
import VoucherSection  from "../components/member/VoucherSection";
import ResepForm       from "../components/member/ResepForm";
import TierSection     from "../components/member/TierSection";
import MemberSidebar   from "../components/member/MemberSidebar";
import ProfileModal    from "../components/member/ProfileModal";
import VoucherModal    from "../components/member/VoucherModal";

const memberPoints  = 1450;
const nextTierPoints = 2000;
const memberTier     = "Gold Care Member";

export default function MemberHome() {
  const [activeTab,    setActiveTab]    = useState("beranda");
  const [isOrdered,    setIsOrdered]    = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [openFaq,      setOpenFaq]      = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    medicineType: "",
    notes: "",
  });

  const [userData, setUserData] = useState({
    name: "VIP Member",
    email: "member@gmail.com",
    phone: "+62 812-3456-7890",
    joinDate: "12 Januari 2025",
    patientRecordId: "RM-LUNA-9921B",
    status: "Active Priority Patient",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName || storedEmail) {
      setUserData(prev => ({
        ...prev,
        name: storedName || prev.name,
        email: storedEmail || prev.email,
      }));
      setFormData(prev => ({
        ...prev,
        customerName: storedName || prev.customerName,
      }));
    }
  }, []);

  const progressPct = Math.round((memberPoints / nextTierPoints) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const priceSimulated = formData.medicineType === "Tebus Resep Dokter" ? 185000 : 75000;
    const pointsEarned = Math.floor(priceSimulated / 1000);

    const newOrder = {
      customer_name: formData.customerName,
      phone: formData.phone || userData.phone,
      medicine_type: formData.medicineType || "Obat Bebas / Vitamin",
      notes: formData.notes,
      price: priceSimulated,
      points_earned: pointsEarned,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from("orders").insert([newOrder]);
      if (error) throw error;
      setIsOrdered(true);
    } catch (err) {
      console.warn("Offline, simulasi pengiriman lokal:", err.message);
      setIsOrdered(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ 
      customerName: localStorage.getItem("userName") || "", 
      phone: "", 
      medicineType: "", 
      notes: "" 
    });
    setIsOrdered(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans antialiased text-slate-800 flex flex-col relative overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      
      {/* FORCE GOLDEN-TEAL STYLE OVERRIDES FOR IMPORTED COMPONENTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@650;700;800&display=swap');
        
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .bg-emerald-650 {
          background-color: #0f766e !important;
        }
        .hover\:bg-emerald-700:hover {
          background-color: #115e59 !important;
        }
        .bg-emerald-50 {
          background-color: #f0fdfa !important;
        }
        .bg-emerald-100 {
          background-color: #ccfbf1 !important;
        }
        .text-emerald-600 {
          color: #0d9488 !important;
        }
        .text-emerald-700 {
          color: #0f766e !important;
        }
        .text-emerald-800 {
          color: #115e59 !important;
        }
        
        .border-emerald-100 {
          border-color: rgba(13, 148, 136, 0.2) !important;
        }
        .border-emerald-200 {
          border-color: rgba(13, 148, 136, 0.3) !important;
        }
        .gradient-green {
          background: linear-gradient(135deg, #0f766e 0%, #115e59 100%) !important;
        }
        .shadow-emerald-500\/20 {
          box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.1), 0 4px 6px -4px rgba(13, 148, 136, 0.1) !important;
        }

        .bg-white, .bg-white\/80 {
          background-color: #fafcfb !important;
          border-color: rgba(196, 181, 153, 0.25) !important;
        }

        .text-slate-900, .text-slate-800 {
          color: #042f2e !important;
        }
        .text-slate-500, .text-slate-400 {
          color: #475569 !important;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-500/5 via-teal-500/5 to-transparent blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* HEADER NAVBAR */}
      <MemberNavbar
        userData={userData}
        memberTier={memberTier}
        onProfileOpen={() => setIsProfileOpen(true)}
      />

      {/* TABS MENU */}
      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 flex-grow">
        
        {activeTab === "beranda" && (
          <>
            {/* HERO PANEL */}
            <MemberHero
              userData={userData}
              memberPoints={memberPoints}
              nextTierPoints={nextTierPoints}
              progressPct={progressPct}
              onProfileOpen={() => setIsProfileOpen(true)}
              setActiveTab={setActiveTab}
            />
            {/* STATS CARDS */}
            <StatCards memberPoints={memberPoints} />

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-8">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-8">
                <VoucherSection onVoucherClick={setActiveVoucher} />
                <ResepForm
                  isOrdered={isOrdered}
                  formData={formData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  onReset={handleResetForm}
                  loading={loading}
                />
                <TierSection />
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-1">
                <MemberSidebar
                  userData={userData}
                  onProfileOpen={() => setIsProfileOpen(true)}
                  openFaq={openFaq}
                  setOpenFaq={setOpenFaq}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "resep" && (
          <div className="max-w-3xl mx-auto py-4">
            <ResepForm
              isOrdered={isOrdered}
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={handleResetForm}
              loading={loading}
            />
          </div>
        )}

        {activeTab === "reward" && (
          <div className="space-y-8">
            <VoucherSection onVoucherClick={setActiveVoucher} />
            <TierSection />
          </div>
        )}

        {activeTab === "riwayat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[#c4b599]/20 rounded-3xl p-6 shadow-md shadow-slate-100">
              <h2 className="text-lg font-bold text-teal-950 mb-4 text-left">Riwayat Aktivitas & Layanan</h2>
              <div className="space-y-4">
                {[
                  { title: "Penebusan Resep #RSP-2026-0041", desc: "Obat rutin asma tebus vip jalur cepat.", date: "2 jam lalu", points: "+150 Poin", status: "Selesai", statusColor: "bg-teal-50 text-teal-700 border-teal-100" },
                  { title: "Tukar Voucher — Vitamin C Strip", desc: "Penukaran 300 Poin reward di gerai Pekanbaru.", date: "Kemarin", points: "-300 Poin", status: "Diproses", statusColor: "bg-amber-50 text-amber-700 border-amber-100" },
                  { title: "Konsultasi Apoteker Online", desc: "Tanya aturan minum antibiotik anak via chat.", date: "3 hari lalu", points: "Free", status: "Selesai", statusColor: "bg-teal-50 text-teal-700 border-teal-100" },
                ].map((act, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-slate-100 hover:border-teal-800/20 hover:bg-[#faf8f5] rounded-2xl transition">
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-slate-800">{act.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{act.desc}</p>
                      <span className="text-[10px] text-slate-400 block mt-2">{act.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-teal-850 bg-[#e6f4f1] border border-teal-100 px-2 py-1 rounded-md">{act.points}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${act.statusColor}`}>{act.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMERGENCY CONSULTATION BANNER */}
        <div className="mt-12 bg-teal-950 text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-lg border border-teal-900/10">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-lg font-bold text-white mb-2">Butuh Konsultasi Obat Darurat?</h2>
            <p className="text-xs text-teal-200/80 leading-relaxed">
              Apoteker priority kami siaga 24 jam untuk menjawab pertanyaan seputar efek samping obat keras, aturan pakai sirup anak, dan interaksi obat.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto justify-center">
            <a 
              href="https://wa.me/62899998888" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-teal-950 text-xs font-bold px-6 py-3.5 rounded-xl transition shadow-md no-underline cursor-pointer active:scale-95 animate-bounce"
            >
              <Phone className="w-4 h-4 text-teal-950" /> Call Center 24 Jam
            </a>
            <div className="flex items-center gap-2 bg-[#092921] text-amber-400 border border-teal-900/30 text-xs font-bold px-6 py-3.5 rounded-xl">
              <MapPin className="w-4 h-4 text-amber-400" /> Pekanbaru, Riau
            </div>
          </div>
        </div>
      </main>

      {/* POPUP MODAL */}
      {isProfileOpen && (
        <ProfileModal
          userData={userData}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      <VoucherModal
        activeVoucher={activeVoucher}
        onClose={() => setActiveVoucher(null)}
      />
    </div>
  );
}