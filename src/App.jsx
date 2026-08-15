import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-indigo-400">ALPHA ANALYZER</h1>
            <p className="text-xs text-slate-400">Traders Club Executive Signal Intelligence</p>
          </div>
          <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]">
            LIVE SYSTEM
          </span>
        </div>
      </header>
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6">
        <Dashboard />
      </main>
      <footer className="bg-slate-200 p-6 text-center text-sm text-slate-600 mt-8">
        <p className="font-semibold text-slate-800">⚠️ Disclaimer Risiko Traders Club</p>
        <p>Analisa ini murni berdasarkan data historis MQL5 & CSV. Kinerja masa lalu tidak menjamin hasil di masa depan.</p>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import SignalAuditReport from './SignalAuditReport';

function App() {
  const [currentPage, setCurrentPage] = useState('audit'); // 'home' atau 'audit'

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      {/* Menu Navigasi Sederhana */}
      <header className="border-b border-slate-800 p-4 flex gap-4 max-w-7xl mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            currentPage === 'home' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Home Dashboard
        </button>
        <button
          onClick={() => setCurrentPage('audit')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            currentPage === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Signal Audit Report
        </button>
      </header>

      {/* Konten Halaman */}
      <main>
        {currentPage === 'audit' ? (
          <SignalAuditReport />
        ) : (
          <div className="p-8 text-center text-slate-400">
            Halaman Dashboard Utama Anda
          </div>
        )}
      </main>
    </div>
  );
}

export default App;