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
  Coffee,
  Download,
  Clock,
  Sparkles,
  Lock,
  UploadCloud,
  FileText,
  Percent,
} from "lucide-react";

export default function App() {
  // State untuk memilih tab analisa: 'retail' | 'institutional'
  const [assessmentMode, setAssessmentMode] = useState("retail");

  // Data terverifikasi hasil audit forensik
  const signalData = {
    name: "World PEACE Multi FX Algo",
    signalId: "MT5 Signal - 003",
    provider: "Nobeyo- Sano",
    broker: "HFMarketsGlobal-Live1",
    accountType: "MT5 Hedging",
    leverage: "1:500",
    subscriptionFee: "$30 USD / Bln",
    followers: 51,
    totalCopierFunds: "$164,000 USD",
    activePeriod: "76 Weeks (~17 Months)",
    growth: "3,283.95%",
    initialDeposit: "145,000 JPY",
    totalDeposits: "702 JPY (Adj)",
    totalWithdrawals: "665,600 JPY (82x)",
    realizedProfit: "724,291 JPY",
    balance: "204,393 JPY",
    equity: "182,853 JPY",
    floatingLoss: "-21,540 JPY (~10.5%)",
    maxEquityDD: "23.7%",
    maxDepositLoad: "12.7%",
    profitFactor: "1.99",
    winRate: "82.4%",
    totalTrades: "3,975",
    maxPeakLayers: 36,
    calmarRatio: "12.19",
    sharpeRatio: "0.14",
    recoveryFactor: "19.35",
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-16">
      {/* 1. TOP NAVBAR */}
      <header className="border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20">
              α
            </div>
            <div>
              <div className="text-base font-extrabold tracking-wide text-white flex items-center gap-2">
                ALPHA ANALYZER
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE SYSTEM
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Traders Club Executive Signal Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer">
              <Lock className="w-3.5 h-3.5" /> Admin Login
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition cursor-pointer">
              <UploadCloud className="w-3.5 h-3.5" /> Upload Screenshot & CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        {/* 2. CO-SUBSCRIPTION / WAKTU KOPI BANNER */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-800/30 rounded-2xl p-5 md:p-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Status Waktu Kopi (Co-Subscription Program)
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Batch #1 Readiness: 90%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sewa Sinyal MQL5 Premium Terverifikasi bersama Komunitas TradersClub
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
              <button className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-xs font-bold text-slate-950 shadow-md shadow-amber-600/20 transition cursor-pointer">
                ☕ Ngopi Otomatis (0% Depan)
              </button>
              <button className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer">
                ☕ Ngopi Mandiri ($5 - $10)
              </button>
              <button className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 text-xs font-semibold text-indigo-300 transition cursor-pointer">
                ✨ Usulkan Sinyal Ini
              </button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
              <span>Kesiapan Server & Kuota Komunitas ({signalData.signalId})</span>
              <span className="text-emerald-400 font-bold">90% Ready</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-400 h-full rounded-full w-[90%]"></div>
            </div>
          </div>
        </div>

        {/* 3. CORE OVERVIEW CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total Growth
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-emerald-400 mt-1">
              {signalData.growth}
            </div>
            <span className="text-[11px] text-slate-500">Reliability: {signalData.activePeriod}</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" /> Total Net Profit
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {signalData.realizedProfit}
            </div>
            <span className="text-[11px] text-slate-500">MQL5 Parsed Net Profit</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-indigo-400" /> Win Rate
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {signalData.winRate}
            </div>
            <span className="text-[11px] text-slate-500">3,277 Wins / 698 Losses</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Max Deposit Load
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-amber-400 mt-1">
              {signalData.maxDepositLoad}
            </div>
            <span className="text-[11px] text-slate-500">Margin Usage Sehat</span>
          </div>
        </div>

        {/* 4. MAIN AUDIT REPORT WITH INTERACTIVE SWITCHER BUTTONS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
          {/* HEADER AUDIT & TOMBOL PILIHAN */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Laporan Audit & Kurasi Sinyal ({signalData.signalId})
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pilih sudut pandang analisa sesuai profil kebutuhan Anda:
              </p>
            </div>

            {/* DUA TOMBOL PILIHAN YANG BISA DIKLIK */}
            <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setAssessmentMode("retail")}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  assessmentMode === "retail"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Retail Copier View
              </button>
              <button
                onClick={() => setAssessmentMode("institutional")}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  assessmentMode === "institutional"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Hedge Fund / BOD View
              </button>
            </div>
          </div>

          {/* KONTEN TAB 1: RETAIL COPIER VIEW */}
          {assessmentMode === "retail" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 bg-slate-950/70 border border-blue-900/40 p-5 md:p-6 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400" /> Ringkasan Keamanan Retail
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-md">
                      Layak Salin (Low-Risk Buffer)
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Sinyal ini menggunakan algoritma <strong>Multi-Currency Grid & Fibonacci Multiplier</strong> pada 10 pasangan mata uang. Bebas dari manipulasi deposit darurat saat posisi floating minus. Modal awal (145.000 JPY) telah berhasil ditarik lebih dari 4.5x lipat melalui 82 kali penarikan mingguan (total WD: 665.600 JPY).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>100% Organik:</strong> Tidak ada top-up penunda MC.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Margin Sehat:</strong> Deposit load puncak hanya 12.73%.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-950/40 to-slate-950 border border-blue-800/40 p-5 md:p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      Retail Safety Score
                    </span>
                    <div className="text-4xl font-extrabold text-white mt-1">
                      8.5 <span className="text-base font-normal text-slate-400">/ 10</span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">
                      Controlled Martingale / Mean Reversion
                    </span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 mt-4 space-y-1.5 text-xs">
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
                      <span className="font-semibold text-white">1:500 or higher</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> SOP Wajib Bagi Copier Retail
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                    <li><strong>Wajib Akun MT5 Hedging:</strong> EA membuka posisi Buy dan Sell bersamaan. Hindari akun Netting/FIFO.</li>
                    <li><strong>Tarik Profit Mingguan:</strong> Amankan profit setiap minggu hingga modal awal 100% kembali (*Zero Risk Mode*).</li>
                    <li><strong>Gunakan Setting Lot Konservatif:</strong> Pertahankan pengali lot 1:1 atau 0.5x karena lot dapat membesar di layer ujung.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Skenario Risiko Ekstrem (Tail Risk)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sistem <strong>tidak menggunakan Hard Stop Loss per tiket</strong>. Jika terjadi tren satu arah ratusan pips tanpa koreksi (*Black Swan* pada JPY/AUD), akumulasi lot bisa melonjak hingga layer ke-10 (puncak 1.69 lot). Selalu siapkan free margin yang memadai.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* KONTEN TAB 2: HEDGE FUND & BOD VIEW */}
          {assessmentMode === "institutional" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 bg-slate-950/70 border border-purple-900/40 p-5 md:p-6 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-purple-400" /> Quantitative & Fiduciary Assessment
                    </span>
                    <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold rounded-md">
                      Tier 2: Satellite Alpha
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Model kuantitatif ini membukukan <strong>Recovery Factor 19.35</strong> dan <strong>Profit Factor 1.99</strong> dengan deposit load maksimum 12.73%. Karena menerapkan eskalasi volume berbasis Fibonacci tanpa Hard Stop Loss per tiket, model ini disetujui hanya untuk mandat <strong>Satellite Alpha Allocation</strong> (Maks. 3% - 5% dari total AUM).
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Calmar Ratio</span>
                      <span className="text-sm md:text-base font-bold text-emerald-400">{signalData.calmarRatio}</span>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Sharpe Ratio</span>
                      <span className="text-sm md:text-base font-bold text-white">{signalData.sharpeRatio}</span>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Return on Capital</span>
                      <span className="text-sm md:text-base font-bold text-purple-400">459% ROC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-950/40 to-slate-950 border border-purple-800/40 p-5 md:p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      Institutional Rating
                    </span>
                    <div className="text-4xl font-extrabold text-white mt-1">
                      Tier 2 <span className="text-base font-normal text-slate-400">/ Qualified</span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">
                      Mandat: Satellite Alpha Allocation
                    </span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Capacity Ceiling:</span>
                      <span className="font-semibold text-white">$500K / Pool</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-purple-400" /> Forensik Arus Kas & Integritas Saldo
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Paid-in Capital:</span>
                      <span className="font-mono text-white">145,000 JPY (~$1,000 USD)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Emergency Margin Injections:</span>
                      <span className="font-mono text-emerald-400 font-bold">0 (Nihil / Bersih)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Akumulasi Distribusi Laba:</span>
                      <span className="font-mono text-purple-400 font-bold">665,600 JPY (82x Payouts)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Operating Reserve Target:</span>
                      <span className="font-mono text-white">~200,000 JPY (Static Pool)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" /> Fiduciary Risk Governance Mandate
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p>
                      <strong>1. Hard Stop Out (Kill Switch):</strong> Wajib mengaktifkan penutupan seluruh portofolio jika akumulasi *Floating Equity Drawdown* melampaui <strong>30%</strong>.
                    </p>
                    <p>
                      <strong>2. Concentration Exposure:</strong> Monitor eksposur netto mata uang komoditas (AUD) saat AUDCAD, AUDNZD, dan AUDJPY aktif membuka layer simultan.
                    </p>
                    <p>
                      <strong>3. Mandatory Weekly Sweep:</strong> Seluruh laba riil wajib ditarik mingguan ke *vault/treasury* untuk mempertahankan rasio *Return of Capital*.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. STRUKTUR SALDO & CASH FLOW DETAIL */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-black">$</span> Struktur Saldo & Arus Kas Akun ({signalData.signalId})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Balance</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{signalData.balance}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Equity</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{signalData.equity}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Initial Deposit</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{signalData.initialDeposit}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Total Deposit</span>
              <span className="text-sm md:text-base font-bold text-emerald-400 mt-1 block">{signalData.totalDeposits}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Total Withdrawal</span>
              <span className="text-sm md:text-base font-bold text-amber-400 mt-1 block">{signalData.totalWithdrawals}</span>
            </div>
          </div>
        </div>

        {/* 6. INFORMASI PROVIDER & DOWNLOAD BUTTON */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-xs">
            <div>
              <span className="text-slate-400 block">Provider Name:</span>
              <span className="font-bold text-white">{signalData.provider}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Broker / Server:</span>
              <span className="font-bold text-white">{signalData.broker}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Followers:</span>
              <span className="font-bold text-blue-400">{signalData.followers} Copier</span>
            </div>
            <div>
              <span className="text-slate-400 block">Total Copier Funds:</span>
              <span className="font-bold text-emerald-400">{signalData.totalCopierFunds}</span>
            </div>
          </div>

          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer">
            <Download className="w-4 h-4" /> Download Laporan PDF — {signalData.signalId}
          </button>
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="text-center pt-4 text-[11px] text-slate-500">
          ⚠️ <strong>Disclaimer Risiko Traders Club:</strong> Analisa ini murni berdasarkan data historis MQL5 & CSV. Kinerja masa lalu tidak menjamin hasil di masa depan.
        </div>
      </main>
    </div>
  );
}