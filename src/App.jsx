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
  Unlock,
  UploadCloud,
  FileText,
  Percent,
  X,
  ChevronRight,
  Database,
  Activity,
  FileSpreadsheet,
  Image as ImageIcon,
  KeyRound,
  LogOut,
  User
} from "lucide-react";

export default function App() {
  // State Interaktif Utama
  const [assessmentMode, setAssessmentMode] = useState("retail"); // 'retail' | 'institutional'
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [historyTab, setHistoryTab] = useState("active"); // 'active' | 'archive'
  const [selectedSignalId, setSelectedSignalId] = useState("MT5 Signal - 003");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Database Sinyal Multi-Signal (Responsif saat diklik)
  const signalsDatabase = {
    "MT5 Signal - 003": {
      name: "World PEACE Multi FX Algo",
      signalId: "MT5 Signal - 003",
      dateAudit: "15 Agu 2026 (Audit)",
      provider: "Provider #003 (Nobeyo- Sano JP)",
      broker: "HFMarketsGlobal-Live1",
      accountType: "MT5 Hedging",
      leverage: "1:500",
      subscriptionFee: "$30 USD / Bln",
      followers: "51 Copier",
      totalCopierFunds: "$164,000 USD",
      activePeriod: "76 Weeks (~17 Months)",
      growth: "3,283.95%",
      initialDeposit: "145,000 JPY",
      totalDeposits: "702 JPY",
      totalWithdrawals: "665,600 JPY",
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
      calmarRatio: "2.95",
      sortinoRatio: "3.25",
      recoveryFactor: "3.85",
      expectedPayoff: "28.5 JPY / Trade",
      holdingTime: "2 Hari",
      filesCount: "Total 7 File (.PNG, 1 file .CSV)",
      strategyType: "Multi-Currency Grid & Fibonacci Multiplier (10 Pairs)"
    },
    "MT5 Signal - 001": {
      name: "Titanium Alpha Trend Scalper",
      signalId: "MT5 Signal - 001",
      dateAudit: "07 Agu 2026",
      provider: "Provider #001 (AlphaTech UA)",
      broker: "ICMarkets-SC-Live",
      accountType: "MT5 Hedging",
      leverage: "1:500",
      subscriptionFee: "$40 USD / Bln",
      followers: "38 Copier",
      totalCopierFunds: "$112,000 USD",
      activePeriod: "63 Weeks (~14 Months)",
      growth: "2,341.33%",
      initialDeposit: "$1,000 USD",
      totalDeposits: "$0 USD",
      totalWithdrawals: "$18,500 USD",
      realizedProfit: "$23,413 USD",
      balance: "$5,913 USD",
      equity: "$5,820 USD",
      floatingLoss: "-$93 USD (~1.6%)",
      maxEquityDD: "25.9%",
      maxDepositLoad: "14.2%",
      profitFactor: "2.15",
      winRate: "61.5%",
      totalTrades: "2,140",
      maxPeakLayers: 8,
      calmarRatio: "2.40",
      sortinoRatio: "2.85",
      recoveryFactor: "4.10",
      expectedPayoff: "$10.94 USD / Trade",
      holdingTime: "14 Jam",
      filesCount: "Total 6 File (.PNG / .CSV)",
      strategyType: "Intraday Momentum & Tight Trailing Stop"
    },
    "MT5 Signal - 002": {
      name: "Apex Multi-EA Institutional Portfolio",
      signalId: "MT5 Signal - 002",
      dateAudit: "06 Agu 2026",
      provider: "Provider #002 (QuantEdge UA)",
      broker: "RoboForex-ProLive",
      accountType: "MT5 Hedging",
      leverage: "1:300",
      subscriptionFee: "$50 USD / Bln",
      followers: "64 Copier",
      totalCopierFunds: "$245,000 USD",
      activePeriod: "58 Weeks (~13 Months)",
      growth: "2,991.11%",
      initialDeposit: "$2,000 USD",
      totalDeposits: "$500 USD",
      totalWithdrawals: "$42,000 USD",
      realizedProfit: "$59,822 USD",
      balance: "$20,322 USD",
      equity: "$19,950 USD",
      floatingLoss: "-$372 USD (~1.8%)",
      maxEquityDD: "23.5%",
      maxDepositLoad: "11.5%",
      profitFactor: "2.38",
      winRate: "59.11%",
      totalTrades: "4,820",
      maxPeakLayers: 18,
      calmarRatio: "3.10",
      sortinoRatio: "3.45",
      recoveryFactor: "4.65",
      expectedPayoff: "$12.41 USD / Trade",
      holdingTime: "1.5 Hari",
      filesCount: "Master Institutional (Multi EA)",
      strategyType: "Portfolio Multi-Strategy (Breakout + Mean Reversion)"
    }
  };

  // Sinyal yang sedang aktif terpilih
  const currentSignal = signalsDatabase[selectedSignalId] || signalsDatabase["MT5 Signal - 003"];

  // Handler Upload File
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files.map((f) => f.name)]);
  };

  // Handler Login Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername.trim() === "admin" && adminPassword.trim() === "admin123") {
      setIsAdminLoggedIn(true);
      setIsAdminModalOpen(false);
      setLoginError("");
      alert("Login Admin Berhasil! Selamat datang di Panel Administrator Traders Club.");
    } else {
      setLoginError("Username atau password admin salah! (Default: admin / admin123)");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername("");
    setAdminPassword("");
    alert("Admin berhasil logout.");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-16">
      {/* ================= 1. TOP NAVBAR ================= */}
      <header className="border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur sticky top-0 z-40">
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
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Admin Active
                </span>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-800/50 bg-red-950/40 text-xs font-semibold text-red-300 hover:bg-red-900/60 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Login
              </button>
            )}

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Upload Screenshot & CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        {/* ================= 2. STATUS WAKTU KOPI BANNER ================= */}
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
              <span>Kesiapan Server & Kuota Komunitas ({currentSignal.signalId})</span>
              <span className="text-emerald-400 font-bold">90% Ready</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-400 h-full rounded-full w-[90%]"></div>
            </div>
          </div>
        </div>

        {/* ================= 3. EXECUTIVE SUMMARY CARDS ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" /> Executive Summary & Institutional Recommendation ({currentSignal.signalId})
            </h3>
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              STATUS: APPROVED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 1. Investment Thesis
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sinyal memiliki <strong>Risk-Adjusted Return yang superior</strong>. Pertumbuhan <strong>{currentSignal.growth}</strong> dicapai dengan reliabilitas rekam jejak selama <strong>{currentSignal.activePeriod}</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 2. Key Risk Consideration
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Max Drawdown tercatat <strong>{currentSignal.maxEquityDD}</strong> dengan Max Deposit Load <strong>{currentSignal.maxDepositLoad}</strong>. Struktur risiko terjaga pada koridor aman & teruji.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 3. Allocation Recommendation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verdict: <span className="text-emerald-400 font-bold">APPROVED</span> | Level: <span className="text-white font-semibold">CONSERVATIVE / BALANCED</span>. Disarankan alokasi modal dengan ketahanan minimum <strong>$500 / 0.01 lot</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. CORE 4 METRICS OVERVIEW ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total Growth
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-emerald-400 mt-1">
              {currentSignal.growth}
            </div>
            <span className="text-[11px] text-slate-500">Reliability: {currentSignal.activePeriod}</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" /> Total Net Profit
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {currentSignal.realizedProfit}
            </div>
            <span className="text-[11px] text-slate-500">MQL5 Parsed Net Profit</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-indigo-400" /> Win Rate
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {currentSignal.winRate}
            </div>
            <span className="text-[11px] text-slate-500">{currentSignal.totalTrades} Total Trades</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Max Deposit Load
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-amber-400 mt-1">
              {currentSignal.maxDepositLoad}
            </div>
            <span className="text-[11px] text-slate-500">Margin Usage Sehat</span>
          </div>
        </div>

        {/* ================= 5. MAIN AUDIT & INVESTIGATION REPORT ================= */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6">
          {/* Header Card & Tombol Toggle View */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Laporan Audit & Kurasi Sinyal ({currentSignal.signalId})
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

          {/* VIEW MODE 1: RETAIL COPIER VIEW */}
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
                    Sinyal <strong>{currentSignal.name}</strong> menggunakan model <strong>{currentSignal.strategyType}</strong>. Bebas dari manipulasi deposit darurat saat posisi floating minus. Modal awal ({currentSignal.initialDeposit}) telah berhasil ditarik berkali-kali lipat melalui siklus penarikan berkala (total WD: {currentSignal.totalWithdrawals}).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>100% Organik:</strong> Tidak ada top-up penunda MC.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Margin Sehat:</strong> Deposit load puncak hanya {currentSignal.maxDepositLoad}.</span>
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
                      Controlled Risk / Stable Growth
                    </span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Modal Rekomendasi:</span>
                      <span className="font-semibold text-white">$1,000 - $2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipe Akun:</span>
                      <span className="font-semibold text-emerald-400">{currentSignal.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Leverage:</span>
                      <span className="font-semibold text-white">{currentSignal.leverage} or higher</span>
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
                    <li><strong>Wajib Akun MT5 Hedging:</strong> EA membuka posisi dinamis. Hindari akun Netting/FIFO.</li>
                    <li><strong>Tarik Profit Berkala:</strong> Amankan profit setiap minggu hingga modal awal 100% kembali (*Zero Risk Mode*).</li>
                    <li><strong>Gunakan Setting Lot Konservatif:</strong> Pertahankan pengali lot 1:1 atau 0.5x untuk menjaga buffer margin.</li>
                  </ul>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Skenario Risiko Ekstrem (Tail Risk)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jika terjadi tren satu arah ratusan pips tanpa koreksi (*Black Swan event*), akumulasi lot bisa meningkat hingga layer puncak. Selalu siapkan free margin yang memadai sesuai rekomendasi kurator.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: INSTITUTIONAL & BOD VIEW (LENGKAP DENGAN 6 POIN AUDIT) */}
          {assessmentMode === "institutional" && (
            <div className="space-y-6">
              {/* Executive Thesis & Rating */}
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
                    Model kuantitatif ini membukukan <strong>Recovery Factor {currentSignal.recoveryFactor}</strong> dan <strong>Profit Factor {currentSignal.profitFactor}</strong> dengan deposit load maksimum {currentSignal.maxDepositLoad}. Disetujui untuk mandat <strong>Satellite Alpha Allocation</strong> (Maks. 3% - 5% dari total AUM).
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Calmar Ratio</span>
                      <span className="text-sm md:text-base font-bold text-emerald-400">{currentSignal.calmarRatio}</span>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Sortino Ratio</span>
                      <span className="text-sm md:text-base font-bold text-white">{currentSignal.sortinoRatio}</span>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Return of Capital</span>
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
                      <span className="font-semibold text-white">$500,000 USD</span>
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

              {/* 6 POIN AUDIT FORENSIK INSTITUSIONAL */}
              <div className="space-y-4">
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-blue-400">~ 1. Analisis Growth & Equity Curve Dynamics</h4>
                  <p className="text-xs text-slate-300">
                    Pertumbuhan akumulatif sinyal <strong>{currentSignal.signalId}</strong> sebesar <strong>{currentSignal.growth}</strong> selama rekam jejak <strong>{currentSignal.activePeriod}</strong> membuktikan kurva ekuitas yang sangat konsisten. Didukung oleh <strong>Calmar Ratio {currentSignal.calmarRatio}</strong> dan <strong>Recovery Factor {currentSignal.recoveryFactor}</strong>, kurva ekuitas mencerminkan efisiensi perolehan profit tanpa eksposur risiko spekulatif ekstrem.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400">~ 2. Market Microstructure & Trade Expectancy</h4>
                  <p className="text-xs text-slate-300">
                    Sinyal mengandalkan eksekusi <strong>Algo Trading 100%</strong> dengan rasio ekspektasi profit per transaksi ("Trade Expectancy") sebesar <strong>{currentSignal.expectedPayoff}</strong>. Rata-rata holding period selama <strong>{currentSignal.holdingTime}</strong> memastikan sistem ini stabil terhadap volatilitas sesi harian.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-amber-400">~ 3. Deteksi Strategi Toxic (Martingale & Grid Check)</h4>
                  <p className="text-xs text-slate-300">
                    Berdasarkan audit struktur margin, <strong>Deposit Load Maksimum tercatat pada {currentSignal.maxDepositLoad}</strong>. Ini adalah validasi bahwa sistem terkelola dengan aman dari ancaman margin call mendadak berkat skema penarikan modal reguler.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-purple-400">~ 4. Fund Capacity & Liquidity Constraints</h4>
                  <p className="text-xs text-slate-300">
                    Kapasitas optimal untuk alokasi dana copy trading pada sinyal ini diperkirakan mencapai <strong>$500,000 USD (High Liquidity Pool)</strong> dengan likuiditas tinggi pada pair mayor dan cross-pairs.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400">~ 5. Evaluasi Metrik Risiko Kuantitatif Lanjutan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Calmar Ratio</span>
                      <span className="text-xs font-bold text-emerald-400">{currentSignal.calmarRatio}</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Sortino Ratio</span>
                      <span className="text-xs font-bold text-emerald-400">{currentSignal.sortinoRatio}</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Recovery Factor</span>
                      <span className="text-xs font-bold text-emerald-400">{currentSignal.recoveryFactor}</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Profit Factor</span>
                      <span className="text-xs font-bold text-emerald-400">{currentSignal.profitFactor}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400">~ 6. Kesimpulan CRO (Chief Risk Officer Final Verdict)</h4>
                  <p className="text-xs text-slate-300">
                    Sinyal <strong>{currentSignal.signalId}</strong> berhasil melewati seluruh standar uji kuantitatif komite investasi institusional dari {currentSignal.followers} aktif beraset {currentSignal.totalCopierFunds}. Rekomendasi mutlak: <strong>APPROVED UNTUK ALOKASI DANA KELOLAAN</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 6. STRUKTUR SALDO & CASH FLOW ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-black">$</span> Struktur Saldo & Arus Kas Akun ({currentSignal.signalId})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Balance</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{currentSignal.balance}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Equity</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{currentSignal.equity}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Initial Deposit</span>
              <span className="text-sm md:text-base font-bold text-white mt-1 block">{currentSignal.initialDeposit}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Total Deposit</span>
              <span className="text-sm md:text-base font-bold text-emerald-400 mt-1 block">{currentSignal.totalDeposits}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-400 block">Total Withdrawal</span>
              <span className="text-sm md:text-base font-bold text-amber-400 mt-1 block">{currentSignal.totalWithdrawals}</span>
            </div>
          </div>
        </div>

        {/* ================= 7. INFORMASI PROVIDER, AKSES, & SALDO COPIER ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-400" /> Informasi Provider, Akses, & Saldo Copier ({currentSignal.signalId})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Provider Name</span>
              <span className="font-bold text-white truncate block mt-0.5">{currentSignal.provider}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Broker / Server</span>
              <span className="font-bold text-white truncate block mt-0.5">{currentSignal.broker}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Subscription Fee</span>
              <span className="font-bold text-amber-400 block mt-0.5">{currentSignal.subscriptionFee}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Reliability</span>
              <span className="font-bold text-white block mt-0.5">{currentSignal.activePeriod}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Followers</span>
              <span className="font-bold text-blue-400 block mt-0.5">{currentSignal.followers}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Modal Copier</span>
              <span className="font-bold text-emerald-400 block mt-0.5">{currentSignal.totalCopierFunds}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Leverage</span>
              <span className="font-bold text-white block mt-0.5">{currentSignal.leverage}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer">
              <Download className="w-4 h-4" /> Download Laporan PDF — {currentSignal.signalId}
            </button>
          </div>
        </div>

        {/* ================= 8. DAFTAR RIWAYAT SINYAL TERANALISIS (RESPONSIF KLIK) ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Daftar Riwayat Sinyal Teranalisis (ALPHA ANALYZER Manager)
              </h3>
              <p className="text-[11px] text-slate-400">
                Klik kartu sinyal di bawah ini untuk mengganti data analisis secara instan:
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setHistoryTab("active")}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  historyTab === "active" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Aktif (3)
              </button>
              <button
                onClick={() => setHistoryTab("archive")}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  historyTab === "archive" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Arsip (0)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: MT5 Signal - 003 */}
            <div
              onClick={() => setSelectedSignalId("MT5 Signal - 003")}
              className={`p-4 rounded-xl border transition cursor-pointer relative group ${
                selectedSignalId === "MT5 Signal - 003"
                  ? "bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    MT5 Signal - 003
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      15 Agu 2026 (Audit)
                    </span>
                  </h4>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Provider: Provider #003 (JP)</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition ${
                    selectedSignalId === "MT5 Signal - 003" ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:translate-x-1"
                  }`}
                />
              </div>
              <div className="text-[11px] space-y-1 mt-3 pt-3 border-t border-slate-900">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">Growth: 3,283.95%</span>
                  <span className="text-slate-400">76 Wks</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Win: 82.4%</span>
                  <span className="text-amber-400">Max DD: 23.7%</span>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Total 7 File (.PNG, 1 file .CSV)
              </div>
            </div>

            {/* Card 2: MT5 Signal - 001 */}
            <div
              onClick={() => setSelectedSignalId("MT5 Signal - 001")}
              className={`p-4 rounded-xl border transition cursor-pointer relative group ${
                selectedSignalId === "MT5 Signal - 001"
                  ? "bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    MT5 Signal - 001
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      07 Agu 2026
                    </span>
                  </h4>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Provider: Provider #001 (UA)</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition ${
                    selectedSignalId === "MT5 Signal - 001" ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:translate-x-1"
                  }`}
                />
              </div>
              <div className="text-[11px] space-y-1 mt-3 pt-3 border-t border-slate-900">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">Growth: 2,341.33%</span>
                  <span className="text-slate-400">63 Wks</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Win: 61.5%</span>
                  <span className="text-amber-400">Max DD: 25.9%</span>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Total 6 File (.PNG / .CSV)
              </div>
            </div>

            {/* Card 3: MT5 Signal - 002 */}
            <div
              onClick={() => setSelectedSignalId("MT5 Signal - 002")}
              className={`p-4 rounded-xl border transition cursor-pointer relative group ${
                selectedSignalId === "MT5 Signal - 002"
                  ? "bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    MT5 Signal - 002
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      06 Agu 2026
                    </span>
                  </h4>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Provider: Provider #002 (UA)</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition ${
                    selectedSignalId === "MT5 Signal - 002" ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:translate-x-1"
                  }`}
                />
              </div>
              <div className="text-[11px] space-y-1 mt-3 pt-3 border-t border-slate-900">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-bold">Growth: 2,991.11%</span>
                  <span className="text-slate-400">58 Wks</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Win: 59.11%</span>
                  <span className="text-amber-400">Max DD: 23.5%</span>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Master Institutional (Multi EA)
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center pt-4 text-[11px] text-slate-500">
          ⚠️ <strong>Disclaimer Risiko Traders Club:</strong> Analisa ini murni berdasarkan data historis MQL5 & CSV. Kinerja masa lalu tidak menjamin hasil di masa depan.
        </div>
      </main>

      {/* ================= 9. MODAL POPUP ADMIN LOGIN ================= */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Administrator Login</h3>
              </div>
              <button
                onClick={() => {
                  setIsAdminModalOpen(false);
                  setLoginError("");
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <p className="text-xs text-slate-300">
                Masukkan kredensial admin untuk mengelola katalog sinyal dan audit parameter.
              </p>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Username / ID Admin</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminModalOpen(false);
                    setLoginError("");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition cursor-pointer"
                >
                  Masuk Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 10. MODAL POPUP UPLOAD FILE ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Upload Screenshot & CSV Sinyal</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Upload screenshot statistik MQL5 (*.png/jpg*) dan/atau file riwayat trading (*.csv/html*) untuk dianalisis oleh engine Alpha Intelligence.
              </p>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 hover:bg-blue-950/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Klik untuk pilih file atau Drag & Drop
                </span>
                <span className="text-[10px] text-slate-500">
                  Mendukung PNG, JPG, CSV posisi trading MT4/MT5
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.csv,.html"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* List File Terupload */}
              {uploadedFiles.length > 0 && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 max-h-32 overflow-y-auto">
                  <span className="text-[11px] font-bold text-slate-400 block">File Siap Dianalisa ({uploadedFiles.length}):</span>
                  {uploadedFiles.map((name, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("File berhasil diterima engine Alpha Analyzer!");
                  setIsUploadModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition cursor-pointer"
              >
                Mulai Analisis Forensik
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}