import React, { useState, useEffect } from "react";
import { Phone, MapPin } from "lucide-react";

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
  const [isRegistered, setIsRegistered] = useState(false);
  const [patientData,  setPatientData]  = useState({ patientName: "", prescriptionId: "", serviceChoice: "", notes: "" });
  const [openFaq,      setOpenFaq]      = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState(null);

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
    }
  }, []);

  const progressPct = Math.round((memberPoints / nextTierPoints) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setIsRegistered(true); 
  };

  const handleReset = () => {
    setPatientData({ patientName: "", prescriptionId: "", serviceChoice: "", notes: "" });
    setIsOrdered(false);
    setIsRegistered(false);
  };

  return (
    <div className="min-h-screen bg-[#090e17] font-sans antialiased text-[#e2e8f0] flex flex-col relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal-550/5 bg-teal-500/5 blur-[140px] pointer-events-none -z-10" />

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
            {/* STUNNING PORTAL HERO LANDING SECTION */}
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
                  isRegistered={isRegistered}
                  patientData={patientData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
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
              isRegistered={isRegistered}
              patientData={patientData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
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
            <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4 text-left">Riwayat Aktivitas & Layanan</h2>
              <div className="space-y-4">
                {[
                  { title: "Penebusan Resep #RSP-2026-0041", desc: "Obat rutin asma tebus vip jalur cepat.", date: "2 jam lalu", points: "+150 Poin", status: "Selesai", statusColor: "bg-emerald-950/50 text-emerald-400 border-emerald-900/30" },
                  { title: "Tukar Voucher — Vitamin C Strip", desc: "Penukaran 300 Poin reward di gerai Pekanbaru.", date: "Kemarin", points: "-300 Poin", status: "Diproses", statusColor: "bg-[#251e13] text-amber-500 border-amber-900/30" },
                  { title: "Konsultasi Apoteker Online", desc: "Tanya aturan minum antibiotik anak via chat.", date: "3 hari lalu", points: "Free", status: "Selesai", statusColor: "bg-emerald-950/50 text-emerald-400 border-emerald-900/30" },
                ].map((act, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-slate-800 hover:border-emerald-500/20 hover:bg-slate-900/40 rounded-2xl transition">
                    <div className="text-left">
                      <h3 className="text-sm font-bold text-white">{act.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{act.desc}</p>
                      <span className="text-[10px] text-slate-500 block mt-2">{act.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-1 rounded-md">{act.points}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${act.statusColor}`}>{act.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMERGENCY CONSULTATION BANNER */}
        <div className="mt-12 bg-[#111827]/90 backdrop-blur-md text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-550/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-lg font-bold text-white mb-2">Butuh Konsultasi Obat Darurat?</h2>
            <p className="text-xs text-slate-350 leading-relaxed">
              Apoteker priority kami siaga 24 jam untuk menjawab pertanyaan seputar efek samping obat keras, aturan pakai sirup anak, dan interaksi obat.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto justify-center">
            <a 
              href="https://wa.me/62899998888" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold px-6 py-3.5 rounded-xl transition shadow-md no-underline cursor-pointer active:scale-95"
            >
              <Phone className="w-4 h-4 text-slate-950" /> Call Center 24 Jam
            </a>
            <div className="flex items-center gap-2 bg-slate-900 text-emerald-400 border border-slate-800 text-xs font-bold px-6 py-3.5 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-400" /> Pekanbaru, Riau
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