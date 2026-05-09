import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage({ code, description, image }) {
    // Default value kalau props nggak dikirim
    const errorCode = code || "404";
    const errorDesc = description || "Halaman tidak ditemukan.";
    const errorImg = image || "https://illustrations.popsy.co/emerald/clumsy-person.svg";

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white p-6 text-center animate-in fade-in zoom-in duration-500">
            {/* Gambar Error */}
            <img src={errorImg} alt="error icon" className="w-64 md:w-80 mb-8 drop-shadow-2xl hover:rotate-3 transition-transform" />
            
            {/* Angka Error di Background */}
            <h1 className="text-9xl font-black text-primary mb-2 opacity-10 tracking-tighter absolute select-none">
                {errorCode}
            </h1>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-black text-teks mb-2 uppercase italic tracking-tighter">
                    Opps! Error {errorCode}
                </h2>
                <p className="text-teks-samping max-w-sm mb-10 font-bold italic opacity-80">
                    "{errorDesc}"
                </p>
                
                <Link 
                    to="/" 
                    className="bg-primary text-white px-12 py-4 rounded-[2rem] font-black shadow-xl shadow-emerald-100 hover:scale-110 active:scale-95 transition-all inline-block uppercase tracking-widest text-xs"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}