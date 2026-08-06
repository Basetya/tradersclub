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
