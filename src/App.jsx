import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowUpCircle,
  Building2,
  UserCheck,
  CheckCircle2,
  BarChart3,
  Flame,
} from "lucide-react";

export default function App() {
  // State untuk memilih mode analisa: 'retail' atau 'institutional'
  const [viewMode, setViewMode] = useState("retail");

  const signalData = {
    name: "World PEACE Multi FX Algo",
    broker: "HFMarketsGlobal-Live1 (MT5 Hedging)",
    leverage: "1:500",
    activePeriod: "76 Weeks (~17 Months)",
    initialDeposit: "145,000 JPY",
    totalDeposits: "702 JPY (Adj)",
    totalWithdrawals: "665,600 JPY (82x)",
    realizedProfit: "+724,291 JPY (+3,284%)",
    currentBalance: "204,393 JPY",
    currentEquity: "182,853 JPY",
    maxEquityDD: "23.68%",
    maxDepositLoad: "12.73%",
    profitFactor: "1.99",
    winRate: "82.44%",
    maxConcurrentLayers: 36,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & DUAL-MODE TOGGLE BUTTONS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Audit Verified
              </span>
              <span className="text-xs text-slate-400">
                Source: MQL5 & MT5 History
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {signalData.name}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Broker: <span className="text-slate-200">{signalData.broker}</span> | Leverage: <span className="text-slate-200">{signalData.leverage}</span> | Durasi: <span className="text-slate-200">{signalData.activePeriod}</span>
            </p>
          </div>

          {/* DUA TOMBOL PILIHAN YANG BISA DI-KLIK */}
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setViewMode("retail")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                viewMode === "retail"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Retail Copier View
            </button>
            <button
              onClick={() => setViewMode("institutional")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                viewMode === "institutional"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Hedge Fund / BOD View
            </button>
          </div>
        </div>

        {/* METRIK KARTU UTAMA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Realized Growth
            </span>
            <div className="text-xl md:text-2xl font-bold text-emerald-400 mt-1">+3,284%</div>
            <span className="text-xs text-slate-500">Net Profit: +724,291 JPY</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Max Equity DD
            </span>
            <div className="text-xl md:text-2xl font-bold text-amber-400 mt-1">{signalData.maxEquityDD}</div>
            <span className="text-xs text-slate-500">Peak Loss: 48,880 JPY</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ArrowUpCircle className="w-3.5 h-3.5 text-blue-400" /> Profit Factor
            </span>
            <div className="text-xl md:text-2xl font-bold text-white mt-1">{signalData.profitFactor}</div>
            <span className="text-xs text-slate-500">Win Rate: {signalData.winRate}</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Peak Layers
            </span>
            <div className="text-xl md:text-2xl font-bold text-purple-400 mt-1">36 Layers</div>
            <span className="text-xs text-slate-500">Deposit Load: {signalData.maxDepositLoad}</span>
          </div>
        </div>

        {/* KONTEN JIKA MEMILIH TAB RETAIL COPIER */}
        {viewMode === "retail" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-900 border border-blue-900/30 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    Analisa Khusus Retail Copier
                  </h2>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
                    Layak Copy (Sesuai SOP)
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Akun ini menggunakan sistem <strong>Multi-Currency Grid & Modified Martingale (Kelipatan Fibonacci)</strong>. Akun ini terbukti organik tanpa suntikan dana darurat saat floating minus. Saldo modal awal (145.000 JPY) sudah berhasil ditarik lebih dari 4x lipat melalui 82 kali penarikan mingguan (total WD: 665.600 JPY).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Bukan Fake Sinyal:</strong> Tidak ada manipulasi deposit saat floating loss besar.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Margin Sehat:</strong> Deposit load puncak hanya 12.73%, menyisakan free margin &gt;87%.</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/40 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Retail Safety Score
                  </span>
                  <div className="text-4xl font-extrabold text-white mt-2">
                    8.5 <span className="text-lg font-normal text-slate-400">/ 10</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Kategori: <em>Controlled Martingale / High-Yield Mean Reversion</em>
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-4 mt-4 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modal Rekomendasi:</span>
                    <span className="font-semibold text-white">$1,000 - $2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tipe Akun:</span>
                    <span className="font-semibold text-emerald-400">MT5 Hedging</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Leverage:</span>
                    <span className="font-semibold text-white">1:500 ke atas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Aturan Wajib Copier
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li><strong>Wajib Akun Hedging:</strong> EA membuka posisi Buy dan Sell bersamaan. Jangan gunakan akun Netting.</li>
                  <li><strong>Tarik Profit Mingguan:</strong> Amankan profit setiap minggu sampai modal awal kembali utuh.</li>
                  <li><strong>Rasio Lot Konservatif:</strong> Gunakan multiplier 1:1 atau 0.5x untuk mengantisipasi layer lot besar.</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Skenario Pembunuh Akun (Black Swan)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Karena sistem <strong>tidak menggunakan Hard Stop Loss per tiket</strong>, ancaman terbesarnya adalah tren satu arah ratusan pips tanpa koreksi (*Black Swan* pada pair JPY/AUD). Jika pergerakan ekstrem berlanjut melewati layer 10, ekuitas akun dapat habis jika tidak disiapkan cadangan modal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KONTEN JIKA MEMILIH TAB HEDGE FUND / BOD */}
        {viewMode === "institutional" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-900 border border-purple-900/40 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-400" />
                    Institutional Due Diligence & Fiduciary Assessment
                  </h2>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold rounded-lg">
                    Tier 2: Satellite Alpha
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Model kuantitatif ini memiliki efisiensi recovery tinggi dengan <strong>Recovery Factor 19.35</strong> dan <strong>Profit Factor 1.99</strong>. Karena menggunakan eskalasi volume berbasis Fibonacci tanpa Hard Stop Loss per tiket, alokasi mandat diklasifikasikan sebagai <strong>Asymmetric Satellite Allocation</strong>, bukan Core Capital.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400">Calmar Ratio (Ann./DD)</span>
                    <div className="text-lg font-bold text-emerald-400">12.19</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400">Sharpe Ratio</span>
                    <div className="text-lg font-bold text-white">0.14</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400">Return of Capital (ROC)</span>
                    <div className="text-lg font-bold text-purple-400">459% Payout</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-950/50 to-slate-900 border border-purple-800/40 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    Institutional Rating
                  </span>
                  <div className="text-4xl font-extrabold text-white mt-2">
                    Tier 2 <span className="text-base font-normal text-slate-400">/ Qualified Alpha</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Mandat: <em>Satellite Speculative (Maksimal 3% - 5% dari AUM Portofolio)</em>
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-4 mt-4 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capacity Ceiling:</span>
                    <span className="font-semibold text-white">$250K - $500K / sub</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Execution Risk:</span>
                    <span className="font-semibold text-amber-400">Slippage Sensitive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kill-Switch Level:</span>
                    <span className="font-semibold text-red-400">Equity DD &gt; 30%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  Forensik Cash Flow & Likuiditas
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Initial Paid-in Capital:</span>
                    <span className="font-mono font-semibold text-white">145,000 JPY (~$1,000)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Emergency Margin Injections:</span>
                    <span className="font-mono font-semibold text-emerald-400">0 (Nihil / Bersih)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Cumulative Realized Payouts:</span>
                    <span className="font-mono font-semibold text-purple-400">665,600 JPY (82 Penarikan)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Operating Reserve Target:</span>
                    <span className="font-mono font-semibold text-white">~200,000 JPY (Static Pool)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Fiduciary Risk Governance & Protocol
                </h3>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <p>
                    <strong>1. Strict Hard Drawdown Cap:</strong> Terapkan *automated account kill-switch* di level <strong>30% Equity Drawdown</strong> untuk menutup seluruh basket order jika terjadi krisis likuiditas.
                  </p>
                  <p>
                    <strong>2. Correlation Concentration:</strong> Waspadai akumulasi volume netto pada mata uang komoditas (AUD) saat AUDCAD, AUDNZD, dan AUDJPY membuka layer searah.
                  </p>
                  <p>
                    <strong>3. Continuous Harvesting Mandate:</strong> Seluruh laba wajib didistribusikan berkala ke akun cadangan (*treasury buffer*) demi menjaga rasio *Return of Capital*.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}