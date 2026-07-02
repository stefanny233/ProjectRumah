import os
import sys
import subprocess

# Ensure reportlab is installed
try:
    import reportlab
except ImportError:
    print("Installing reportlab...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Header (on pages after cover page)
        if self._pageNumber > 1:
            self.drawString(54, 750, "SIApotek CRM - PRD & Outcomes Report")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
            # Footer
            self.line(54, 55, 558, 55)
            page_text = f"Halaman {self._pageNumber} dari {page_count}"
            self.drawRightString(558, 40, page_text)
            self.drawString(54, 40, "Confidential - For Internal Review Only")
            
        self.restoreState()

def build_pdf(filename="SIApotek_CRM_PRD_Outcomes.pdf"):
    # Target page width = 612, height = 792 for letter size
    # Margins: 0.75 inch (54 points) left/right, top 1.0 inch, bottom 1.0 inch
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#064e3b'), # Dark Emerald
        spaceAfter=12
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0f766e'), # Teal
        spaceAfter=30
    )
    
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#064e3b'),
        spaceBefore=18,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0f766e'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#1e293b'), # Slate 800
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#047857'),
        backColor=colors.HexColor('#f0fdf4'),
        borderColor=colors.HexColor('#a7f3d0'),
        borderWidth=1,
        borderPadding=10,
        spaceBefore=10,
        spaceAfter=15,
        borderRadius=8
    )

    story = []

    # --- COVER PAGE ---
    story.append(Spacer(1, 150))
    story.append(Paragraph("SIApotek CRM System", subtitle_style))
    story.append(Paragraph("Product Requirement Document (PRD)<br/>& Development Outcomes Report", title_style))
    story.append(Paragraph("Comprehensive documentation of PRD v1, v2, and v3 requirements<br/>along with implementation results and visual revamps.", subtitle_style))
    
    story.append(Spacer(1, 100))
    
    # Metadata Table
    metadata_data = [
        [Paragraph("<b>Dipersiapkan Oleh:</b> AI Coding Assistant (Antigravity)", body_style), 
         Paragraph("<b>Tanggal:</b> 2 Juli 2026", body_style)],
        [Paragraph("<b>Proyek:</b> Proyek Rumah - luna-app", body_style), 
         Paragraph("<b>Status:</b> Completed & Revamped", body_style)]
    ]
    meta_table = Table(metadata_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(meta_table)
    story.append(PageBreak())

    # --- SECTION 1: PRD V1 ---
    story.append(Paragraph("1. PRD v1: Core Apothecary System & Supabase Setup", h1_style))
    story.append(Paragraph(
        "Fase pertama proyek berfokus pada pembangunan fondasi aplikasi SIApotek, "
        "menyiapkan integrasi database Supabase, dan membuat manajemen internal dasar seperti Karyawan.",
        body_style
    ))
    
    story.append(Paragraph("1.1 Kebutuhan Utama (Requirements)", h2_style))
    story.append(Paragraph("• <b>Inisialisasi Proyek:</b> Konfigurasi project React 19 menggunakan Vite 8 dan Tailwind CSS untuk antarmuka pengguna.", bullet_style))
    story.append(Paragraph("• <b>Integrasi Supabase:</b> Membuat file inisialisasi client Supabase dengan API key yang aman.", bullet_style))
    story.append(Paragraph("• <b>Manajemen Karyawan:</b> Halaman data karyawan (Employee.jsx) dengan formulir input lengkap (Nama, Email, Telepon, Gaji, dll) dan sinkronisasi database.", bullet_style))
    story.append(Paragraph("• <b>Autentikasi Dasar:</b> Menyediakan alur login dan registrasi dasar menggunakan tabel kustom untuk kemudahan demo praktikum.", bullet_style))

    story.append(Paragraph("1.2 Hasil Implementasi (Outcomes)", h2_style))
    
    # Table of Outcomes for V1
    v1_table_data = [
        [Paragraph("<b>Fitur / Modul</b>", body_style), Paragraph("<b>Hasil Implementasi & Status</b>", body_style)],
        [Paragraph("Struktur Frontend", body_style), Paragraph("Vite + React 19 berjalan lancar dengan Tailwind CSS 4 dan DaisyUI 4. Font menggunakan Geist Variable.", body_style)],
        [Paragraph("Koneksi Supabase", body_style), Paragraph("Terbuat berkas <font face='Courier'>supabaseClient.js</font> yang sukses terhubung ke backend ID <font face='Courier'>elyoefbzqtzvqmpqlqyg</font>.", body_style)],
        [Paragraph("Modul Karyawan", body_style), Paragraph("Halaman <font face='Courier'>Employee.jsx</font> terintegrasi dengan REST API Supabase melalui service Axios di <font face='Courier'>userService.js</font>.", body_style)],
        [Paragraph("Database Schema", body_style), Paragraph("Dibuat tabel <font face='Courier'>user</font> di Supabase untuk menyimpan data login dan profil karyawan secara tersinkronisasi.", body_style)]
    ]
    v1_table = Table(v1_table_data, colWidths=[150, 354])
    v1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e2e8f0')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(v1_table)
    
    story.append(Paragraph(
        "<b>Catatan Hasil Evaluasi Keamanan:</b> Sistem menggunakan tabel kustom untuk login. Disarankan untuk memindahkan "
        "kredensial ke Supabase Auth bawaan (auth.users) di lingkungan produksi untuk enkripsi kata sandi secara otomatis.",
        callout_style
    ))
    story.append(PageBreak())

    # --- SECTION 2: PRD V2 ---
    story.append(Paragraph("2. PRD v2: Customer Reservation Portal & CRM Logic", h1_style))
    story.append(Paragraph(
        "Fase kedua berfokus pada sisi pelanggan (tamu apotek) dengan meluncurkan modul reservasi obat online "
        "dan simulasi CRM untuk mendongkrak retensi dan loyalitas hubungan pasien.",
        body_style
    ))
    
    story.append(Paragraph("2.1 Kebutuhan Utama (Requirements)", h2_style))
    story.append(Paragraph("• <b>Guest Landing Page:</b> Landing page publik (GuestHome.jsx) sebagai gerbang utama bagi pengunjung sebelum login.", bullet_style))
    story.append(Paragraph("• <b>Live Database Status:</b> Indikator koneksi database Supabase secara real-time di bagian atas halaman.", bullet_style))
    story.append(Paragraph("• <b>Reservasi Obat Online:</b> Formulir pengajuan reservasi obat yang langsung menyimpan data ke tabel <b>orders</b> di Supabase.", bullet_style))
    story.append(Paragraph("• <b>Offline Fallback Demo:</b> Jika database belum siap/offline, sistem harus memiliki backup penyimpanan state lokal agar demo tetap lancar.", bullet_style))
    story.append(Paragraph("• <b>Simulator CRM & Waktu:</b> Widget interaktif simulator poin loyalitas (Tier Member) dan estimasi waktu penyiapan resep obat.", bullet_style))

    story.append(Paragraph("2.2 Hasil Implementasi (Outcomes)", h2_style))
    
    v2_table_data = [
        [Paragraph("<b>Fitur / Modul</b>", body_style), Paragraph("<b>Hasil Implementasi & Status</b>", body_style)],
        [Paragraph("Database Status Widget", body_style), Paragraph("Menampilkan indikator status live sync API Supabase. Melakukan deteksi otomatis apakah tabel 'orders' sudah termigrasi.", body_style)],
        [Paragraph("Form Reservasi Obat", body_style), Paragraph("Formulir sukses meng-insert data resep ke tabel orders. Menggunakan RLS Policy insert bypass agar guest dapat memesan tanpa login.", body_style)],
        [Paragraph("Offline State Backup", body_style), Paragraph("Menggunakan fallback array state lokal. Log transaksi masuk secara dinamis di-render ke terminal visual demo.", body_style)],
        [Paragraph("Poin & Tier Simulator", body_style), Paragraph("Slider dinamis menghitung poin (Rp 1.000 = 1 Poin) dan membagi tier member secara instan: Bronze, Silver, Gold, Platinum.", body_style)],
        [Paragraph("Estimator Waktu", body_style), Paragraph("Menghitung waktu tunggu apotek berdasarkan tipe obat (Obat Bebas = 10 mnt, Resep = 30 mnt) ditambah jumlah item.", body_style)]
    ]
    v2_table = Table(v2_table_data, colWidths=[150, 354])
    v2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e2e8f0')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(v2_table)
    story.append(Spacer(1, 10))
    story.append(PageBreak())

    # --- SECTION 3: PRD V3 ---
    story.append(Paragraph("3. PRD v3: Premium UI Revamp & VIP Member Portal", h1_style))
    story.append(Paragraph(
        "Fase ketiga adalah pemolesan kualitas desain visual (UI/UX) secara besar-besaran untuk menghadirkan "
        "tampilan kelas atas khas startup teknologi kesehatan modern, serta merombak total Portal Member.",
        body_style
    ))
    
    story.append(Paragraph("3.1 Kebutuhan Utama (Requirements)", h2_style))
    story.append(Paragraph("• <b>High-End Visual Aesthetic:</b> Menerapkan gaya SaaS modern, sudut membulat (rounded corner), glassmorphism tipis, bayangan lembut, dan white space yang melimpah.", bullet_style))
    story.append(Paragraph("• <b>Emerald Green Theme:</b> Palet warna utama Hijau Emerald, dipadukan dengan latar belakang putih bersih dan abu-abu muda.", bullet_style))
    story.append(Paragraph("• <b>Navbar Customization:</b> Header Guest memiliki tombol pendaftaran (Daftar Sekarang → /register) dan masuk (Sign In → /login).", bullet_style))
    story.append(Paragraph("• <b>Tailwind CSS Refactor:</b> Mengonversi seluruh 10 komponen member yang awalnya menggunakan inline CSS kaku menjadi Tailwind CSS murni.", bullet_style))
    story.append(Paragraph("• <b>Member Hero & Card 3D:</b> Menampilkan halaman selamat datang spektakuler dengan replika kartu member VIP digital yang interaktif di sisi kanan.", bullet_style))
    story.append(Paragraph("• <b>Tab Filtering:</b> Menu tab member (Beranda, Tebus Resep, Reward, Riwayat) menyaring tampilan secara responsif.", bullet_style))

    story.append(Paragraph("3.2 Hasil Implementasi (Outcomes)", h2_style))
    
    v3_table_data = [
        [Paragraph("<b>Fitur / Komponen</b>", body_style), Paragraph("<b>Hasil Implementasi & Status</b>", body_style)],
        [Paragraph("Landing Hero Revamp", body_style), Paragraph("Dilengkapi ambient glows, background gradient blur, tombol CTA modern, dan mac-style terminal mockup log transaksi.", body_style)],
        [Paragraph("Header Guest", body_style), Paragraph("Memiliki tombol navigasi Sign In dan Daftar Sekarang yang terhubung ke rute autentikasi masing-masing.", body_style)],
        [Paragraph("Member Hero (New)", body_style), Paragraph("Komponen baru yang menampilkan Gold Care Card interaktif beraksen emas dengan efek 3D hover scale.", body_style)],
        [Paragraph("Refaktor Komponen Member", body_style), Paragraph("10 komponen member (Navbar, Tabs, Banner, StatCards, Voucher, ResepForm, Tier, Sidebar, ProfileModal, VoucherModal) 100% menggunakan Tailwind CSS.", body_style)],
        [Paragraph("Interactive Tabs", body_style), Paragraph("Fungsionalitas Tab aktif berhasil menyaring layout: Beranda menampilkan widget lengkap, Resep memfokuskan form, Reward memfokuskan voucher, dan Riwayat menampilkan tabel riwayat.", body_style)]
    ]
    v3_table = Table(v3_table_data, colWidths=[150, 354])
    v3_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e2e8f0')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(v3_table)
    
    story.append(Paragraph(
        "<b>Kesimpulan Revamp:</b> Dengan diselesaikannya PRD v3, antarmuka Guest dan Member "
        "kini memiliki keselarasan visual (visual hierarchy) yang sangat premium, memberikan "
        "pengalaman pengguna yang lancar dan prestisius bagi pasien prioritas.",
        callout_style
    ))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF successfully generated.")

if __name__ == "__main__":
    build_pdf()
