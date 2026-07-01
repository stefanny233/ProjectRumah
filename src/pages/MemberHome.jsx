import React, { useState } from "react";
import { Phone, MapPin } from "lucide-react";

import MemberNavbar    from "../components/member/MemberNavbar";
import MemberTabs      from "../components/member/MemberTabs";
import WelcomeBanner   from "../components/member/WelcomeBanner";
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

const userData = {
  name: "VIP Paney",
  email: "member@gmail.com",
  phone: "+62 812-3456-7890",
  joinDate: "12 Januari 2025",
  patientRecordId: "RM-LUNA-9921B",
  status: "Active Priority Patient",
};

export default function MemberHome() {
  const [activeTab,    setActiveTab]    = useState("beranda");
  const [isRegistered, setIsRegistered] = useState(false);
  const [patientData,  setPatientData]  = useState({ patientName: "", prescriptionId: "", serviceChoice: "", notes: "" });
  const [openFaq,      setOpenFaq]      = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState(null);

  const progressPct = Math.round((memberPoints / nextTierPoints) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => { e.preventDefault(); setIsRegistered(true); };

  const handleReset = () => {
    setPatientData({ patientName: "", prescriptionId: "", serviceChoice: "", notes: "" });
    setIsRegistered(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f3", fontFamily: "Inter, system-ui, sans-serif", color: "#1a1f1a", fontSize: 14 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      <MemberNavbar
        userData={userData}
        memberTier={memberTier}
        onProfileOpen={() => setIsProfileOpen(true)}
      />

      <MemberTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 48px" }}>

        <WelcomeBanner
          userData={userData}
          memberPoints={memberPoints}
          nextTierPoints={nextTierPoints}
          progressPct={progressPct}
          onProfileOpen={() => setIsProfileOpen(true)}
        />

        <StatCards memberPoints={memberPoints} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

          {/* KOLOM KIRI */}
          <div style={{ minWidth: 0 }}>
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

          {/* KOLOM KANAN */}
          <MemberSidebar
            userData={userData}
            onProfileOpen={() => setIsProfileOpen(true)}
            openFaq={openFaq}
            setOpenFaq={setOpenFaq}
          />
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 24, background: "#0a1f0a", borderRadius: 16, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#e1f5ee", marginBottom: 5 }}>Butuh Konsultasi Obat Darurat?</div>
            <p style={{ fontSize: 12, color: "#5dcaa5", maxWidth: 380, lineHeight: 1.6 }}>Apoteker SIPA siaga 24 jam — efek samping obat keras, aturan pakai sirup anak, interaksi zat kimia.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://wa.me/62899998888" target="_blank" rel="noopener noreferrer" style={{ background: "#1d9e75", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 10, display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <Phone style={{ width: 14, height: 14 }} /> Call Center 24 Jam
            </a>
            <div style={{ border: "0.5px solid #2a4a2a", color: "#9fe1cb", fontSize: 13, padding: "10px 18px", borderRadius: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin style={{ width: 14, height: 14 }} /> Pekanbaru, Riau
            </div>
          </div>
        </div>
      </div>

      {/* PERBAIKAN DI SINI: Dibungkus dengan kondisi state agar jika false tidak merusak tampilan background */}
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