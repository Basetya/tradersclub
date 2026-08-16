import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased">
      {/* HEADER NAV */}
      <header className="no-print bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3 flex justify-between items-center max-w-7xl w-full mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-500/30">
            α
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold tracking-wider text-white">ALPHA ANALYZER</h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">LIVE SYSTEM</span>
            </div>
            <p className="text-[11px] text-slate-400">Traders Club Executive Signal Intelligence</p>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        <Dashboard />
      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">© 2026 TradersClub Executive Signal Intelligence.</p>
        <p className="text-[11px] mt-1 text-slate-600">
          Analisis ini murni berbasis data historis MQL5 terverifikasi. Keputusan alokasi modal dan risiko trading berada pada masing-masing pengguna.
        </p>
      </footer>
    </div>
  );
}
