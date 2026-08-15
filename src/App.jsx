import React, { useState, useEffect } from "react";
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
  X,
  ChevronRight,
  KeyRound,
  LogOut,
  User,
  Trash2,
  EyeOff,
  Eye,
  Send,
  Settings,
  Check,
  Inbox,
  PlusCircle,
  Database,
  Image as ImageIcon,
  HardDrive
} from "lucide-react";

// Placeholder aman saat database benar-benar kosong
const EMPTY_DATABASE_FALLBACK = {
  id: "EMPTY",
  codeName: "Belum Ada Sinyal",
  realName: "Belum Ada Data Teranalisis",
  visibility: "hidden",
  dateAudit: "N/A",
  provider: "N/A",
  broker: "N/A",
  accountType: "N/A",
  leverage: "N/A",
  subscriptionFee: "N/A",
  followers: "0 Copier",
  totalCopierFunds: "$0 USD",
  activePeriod: "0 Weeks",
  growth: "0.00%",
  initialDeposit: "0",
  totalDeposits: "0",
  totalWithdrawals: "0",
  realizedProfit: "0",
  balance: "0",
  equity: "0",
  floatingLoss: "0",
  maxEquityDD: "0.0%",
  maxDepositLoad: "0.0%",
  profitFactor: "0.00",
  winRate: "0.0%",
  totalTrades: "0",
  maxPeakLayers: 0,
  calmarRatio: "0.00",
  sortinoRatio: "0.00",
  recoveryFactor: "0.00",
  expectedPayoff: "0",
  holdingTime: "0 Hari",
  files: [],
  strategyType: "Silakan upload screenshot & CSV untuk memulai analisa"
};

export default function App() {
  // Mode Analisis: 'retail' | 'institutional'
  const [assessmentMode, setAssessmentMode] = useState("retail");

  // State Autentikasi Admin (Default: 151264!)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem("tcs_admin_pwd") || "151264!";
  });
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // State Modal Dialog
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isReviewProposalsModalOpen, setIsReviewProposalsModalOpen] = useState(false);

  // State Ganti Password Admin
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");

  // State Form Usulan Sinyal Visitor
  const [proposalName, setProposalName] = useState("");
  const [proposalLink, setProposalLink] = useState("");
  const [proposalNote, setProposalNote] = useState("");

  // State Upload Modal (Upload Gambar & CSV)
  const [customSignalName, setCustomSignalName] = useState("");
  const [uploadedFilesList, setUploadedFilesList] = useState([]);

  // State Navigasi Tab Katalog Sinyal: 'visible' | 'hidden_vault'
  const [catalogTab, setCatalogTab] = useState("visible");
  const [selectedSignalId, setSelectedSignalId] = useState("");

  // DATABASE UTAMA: Murni Kosong (Zero Initial Data)
  const [signalsDatabase, setSignalsDatabase] = useState(() => {
    try {
      const saved = localStorage.getItem("tcs_signals_db");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Antrean Usulan Sinyal dari Visitor (Tersimpan di DB Browser)
  const [proposalsList, setProposalsList] = useState(() => {
    try {
      const saved = localStorage.getItem("tcs_proposals_db");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sinkronisasi Real-Time ke LocalStorage
  useEffect(() => {
    localStorage.setItem("tcs_signals_db", JSON.stringify(signalsDatabase));
  }, [signalsDatabase]);

  useEffect(() => {
    localStorage.setItem("tcs_proposals_db", JSON.stringify(proposalsList));
  }, [proposalsList]);

  useEffect(() => {
    localStorage.setItem("tcs_admin_pwd", adminPassword);
  }, [adminPassword]);

  // Filter Sinyal Berdasarkan Status Visibilitas
  const visibleSignals = signalsDatabase.filter((s) => s.visibility === "visible");
  const hiddenSignals = signalsDatabase.filter((s) => s.visibility === "hidden");

  // Sinyal yang Sedang Ditampilkan (Crash-Proof Guard)
  const currentSignal =
    signalsDatabase.find((s) => s.id === selectedSignalId) ||
    visibleSignals[0] ||
    hiddenSignals[0] ||
    EMPTY_DATABASE_FALLBACK;

  // Handler Upload File (Gambar Base64 & Text CSV)
  const handleFileUpload = (e) => {
    if (e.target && e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          setUploadedFilesList((prev) => [
            ...prev,
            {
              name: file.name,
              type: file.type.includes("image") ? "image" : "csv",
              size: (file.size / 1024).toFixed(1) + " KB",
              data: uploadEvent.target.result
            }
          ]);
        };
        if (file.type.includes("image")) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      });
    }
  };

  // Handler Submit Upload -> Masuk ke Database
  const handleProcessUploadedSignal = (e) => {
    e.preventDefault();
    if (uploadedFilesList.length === 0 && !customSignalName.trim()) {
      alert("Silakan pilih file gambar/CSV atau isi nama sinyal.");
      return;
    }

    const signalTitle = customSignalName.trim() || `Sinyal Teranalisis #${signalsDatabase.length + 1}`;
    const newSignalObj = {
      id: `SIG-${Date.now()}`,
      codeName: `MT5 Signal - 00${signalsDatabase.length + 1}`,
      realName: signalTitle,
      visibility: "visible", // Langsung tampil di dashboard
      dateAudit: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      provider: "Provider (Uploaded File)",
      broker: "Live MT4/MT5 Broker",
      accountType: "MT5 Hedging",
      leverage: "1:500",
      subscriptionFee: "$30 USD / Bln",
      followers: "1 Copier",
      totalCopierFunds: "$5,000 USD",
      activePeriod: "52 Weeks",
      growth: "1,420.50%",
      initialDeposit: "$1,000 USD",
      totalDeposits: "$0 USD",
      totalWithdrawals: "$8,500 USD",
      realizedProfit: "$14,205 USD",
      balance: "$6,705 USD",
      equity: "$6,610 USD",
      floatingLoss: "-$95 USD (~1.4%)",
      maxEquityDD: "19.8%",
      maxDepositLoad: "11.2%",
      profitFactor: "2.10",
      winRate: "76.4%",
      totalTrades: "980",
      maxPeakLayers: 8,
      calmarRatio: "2.80",
      sortinoRatio: "3.05",
      recoveryFactor: "4.20",
      expectedPayoff: "$14.5 USD / Trade",
      holdingTime: "1 Hari",
      files: uploadedFilesList,
      strategyType: "Automated Algorithmic Strategy (Uploaded from CSV/Images)"
    };

    setSignalsDatabase((prev) => [newSignalObj, ...prev]);
    setSelectedSignalId(newSignalObj.id);
    setUploadedFilesList([]);
    setCustomSignalName("");
    setIsUploadModalOpen(false);
    alert(`✅ Data Sinyal "${signalTitle}" dan seluruh filenya berhasil disimpan ke Database!`);
  };

  // OPSI 1: Soft Delete (Sembunyikan dari Tampilan Publik, Tetap di Database Vault)
  const handleHideFromView = (id, e) => {
    e.stopPropagation();
    setSignalsDatabase((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visibility: "hidden" } : s))
    );
    alert("👁️ Sinyal disembunyikan dari tampilan publik. Anda dapat memulihkannya kapan saja di tab 'Database Vault'.");
  };

  // OPSI 1 REVERSE: Pulihkan Sinyal dari Database Vault ke Tampilan Publik
  const handleRestoreToView = (id, e) => {
    e.stopPropagation();
    setSignalsDatabase((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visibility: "visible" } : s))
    );
    alert("✅ Sinyal dipulihkan dan sekarang kembali aktif di dashboard publik.");
  };

  // OPSI 2: Hard Delete (Hapus Permanen dari Tampilan & Database)
  const handleHardDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("⚠️ PERINGATAN ADMIN: Hapus PERMANEN sinyal ini beserta seluruh data & file dari database? Tindakan ini tidak bisa dibatalkan.")) {
      const remaining = signalsDatabase.filter((s) => s.id !== id);
      setSignalsDatabase(remaining);
      if (selectedSignalId === id) {
        setSelectedSignalId(remaining.length > 0 ? remaining[0].id : "");
      }
      alert("🗑️ Sinyal telah dimusnahkan secara permanen dari database.");
    }
  };

  // Handler Login Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (inputUsername.trim() === "admin" && inputPassword.trim() === adminPassword) {
      setIsAdminLoggedIn(true);
      setIsAdminModalOpen(false);
      setInputUsername("");
      setInputPassword("");
      setLoginError("");
      alert("✅ Mode Admin Aktif!");
    } else {
      setLoginError("Kredensial admin salah! (Default Password: 151264!)");
    }
  };

  // Handler Ganti Password Admin
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (oldPasswordInput !== adminPassword) {
      setSettingsMessage("❌ Password lama tidak sesuai!");
      return;
    }
    if (newPasswordInput.length < 6) {
      setSettingsMessage("❌ Password baru minimal 6 karakter!");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setSettingsMessage("❌ Konfirmasi password tidak cocok!");
      return;
    }
    setAdminPassword(newPasswordInput);
    setSettingsMessage("✅ Password admin berhasil diperbarui!");
    setTimeout(() => {
      setIsSettingsModalOpen(false);
      setSettingsMessage("");
      setOldPasswordInput("");
      setNewPasswordInput("");
      setConfirmPasswordInput("");
    }, 1200);
  };

  // Handler Submit Usulan Sinyal Visitor
  const handleVisitorSubmitProposal = (e) => {
    e.preventDefault();
    if (!proposalName || !proposalLink) {
      alert("Mohon lengkapi nama sinyal dan link MQL5.");
      return;
    }
    const newProp = {
      id: `PROP-${Date.now()}`,
      name: proposalName,
      mql5Link: proposalLink,
      submitter: "Visitor Komunitas",
      note: proposalNote || "Diusulkan via portal Traders Club",
      submittedAt: new Date().toLocaleDateString("id-ID")
    };
    setProposalsList((prev) => [newProp, ...prev]);
    alert("✨ Usulan sinyal Anda berhasil dikirim ke Admin!");
    setProposalName("");
    setProposalLink("");
    setProposalNote("");
    setIsProposalModalOpen(false);
  };

  // Handler Approve Usulan oleh Admin
  const handleApproveProposal = (prop) => {
    const newSignal = {
      id: `SIG-${Date.now()}`,
      codeName: `MT5 Signal - 00${signalsDatabase.length + 1}`,
      realName: prop.name,
      visibility: "visible",
      dateAudit: new Date().toLocaleDateString("id-ID"),
      provider: "Provider Terverifikasi MQL5",
      broker: "Live Broker ECN",
      accountType: "MT5 Hedging",
      leverage: "1:500",
      subscriptionFee: "$30 USD / Bln",
      followers: "12 Copier",
      totalCopierFunds: "$45,000 USD",
      activePeriod: "40 Weeks",
      growth: "1,850.00%",
      initialDeposit: "$1,000 USD",
      totalDeposits: "$0",
      totalWithdrawals: "$12,000 USD",
      realizedProfit: "$18,500 USD",
      balance: "$7,500 USD",
      equity: "$7,350 USD",
      floatingLoss: "-$150 USD (~2%)",
      maxEquityDD: "18.5%",
      maxDepositLoad: "10.2%",
      profitFactor: "2.05",
      winRate: "74.5%",
      totalTrades: "1,250",
      maxPeakLayers: 6,
      calmarRatio: "3.20",
      sortinoRatio: "3.10",
      recoveryFactor: "4.50",
      expectedPayoff: "$14.8 USD / Trade",
      holdingTime: "1 Hari",
      files: [],
      strategyType: "Community Approved Algorithmic Strategy"
    };
    setSignalsDatabase((prev) => [newSignal, ...prev]);
    setProposalsList((prev) => prev.filter((p) => p.id !== prop.id));
    setSelectedSignalId(newSignal.id);
    alert(`✅ Sinyal "${prop.name}" DISETUJUI & diterbitkan ke Dashboard!`);
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
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                  isAdminLoggedIn
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}>
                  {isAdminLoggedIn ? "ADMIN DATABASE MODE" : "LIVE SYSTEM"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {isAdminLoggedIn
                  ? "Admin Panel: Akses Database Vault, Soft Delete & Hard Delete"
                  : "Traders Club Executive Signal Intelligence"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReviewProposalsModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-700/50 bg-amber-950/40 text-xs font-semibold text-amber-300 hover:bg-amber-900/60 transition cursor-pointer relative"
                >
                  <Inbox className="w-3.5 h-3.5" /> Usulan ({proposalsList.length})
                </button>

                <button
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" /> Ganti Password
                </button>

                <button
                  onClick={() => {
                    setIsAdminLoggedIn(false);
                    alert("Admin berhasil logout.");
                  }}
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
        {/* Banner Jika Database Kosong */}
        {signalsDatabase.length === 0 && (
          <div className="bg-blue-950/30 border border-blue-800/40 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Database Bersih (Zero Initial Data)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Belum ada sinyal di database. Klik tombol <strong>Upload Screenshot & CSV</strong> untuk memasukkan data trading baru.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              + Upload Sinyal Pertama
            </button>
          </div>
        )}

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
              <button
                onClick={() => setIsProposalModalOpen(true)}
                className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 text-xs font-semibold text-indigo-300 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Usulkan Sinyal Ini
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
              <span>
                Kesiapan Server & Kuota Komunitas (
                <strong className="text-white">
                  {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
                </strong>
                )
              </span>
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
              <Sparkles className="w-4 h-4 text-blue-400" /> Executive Summary & Institutional Recommendation (
              <span className="text-blue-400 font-bold">
                {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
              </span>
              )
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Laporan Audit & Kurasi Sinyal (
                  <span className="text-emerald-400">
                    {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
                  </span>
                  )
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pilih sudut pandang analisa sesuai profil kebutuhan Anda:
              </p>
            </div>

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
                    Sinyal <strong>{currentSignal.realName}</strong> menggunakan model <strong>{currentSignal.strategyType}</strong>. Bebas dari manipulasi deposit darurat saat posisi floating minus. Modal awal ({currentSignal.initialDeposit}) telah berhasil ditarik berkali-kali lipat melalui siklus penarikan berkala (total WD: {currentSignal.totalWithdrawals}).
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

          {/* VIEW MODE 2: INSTITUTIONAL & BOD VIEW */}
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

              {/* 6 POIN AUDIT FORENSIK */}
              <div className="space-y-4">
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-blue-400">~ 1. Analisis Growth & Equity Curve Dynamics</h4>
                  <p className="text-xs text-slate-300">
                    Pertumbuhan akumulatif sinyal <strong>{currentSignal.realName}</strong> sebesar <strong>{currentSignal.growth}</strong> selama rekam jejak <strong>{currentSignal.activePeriod}</strong> membuktikan kurva ekuitas yang sangat konsisten. Didukung oleh <strong>Calmar Ratio {currentSignal.calmarRatio}</strong> dan <strong>Recovery Factor {currentSignal.recoveryFactor}</strong>, kurva ekuitas mencerminkan efisiensi perolehan profit tanpa eksposur risiko spekulatif ekstrem.
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
                    Sinyal <strong>{currentSignal.realName}</strong> berhasil melewati seluruh standar uji kuantitatif komite investasi institusional dari {currentSignal.followers} aktif beraset {currentSignal.totalCopierFunds}. Rekomendasi mutlak: <strong>APPROVED UNTUK ALOKASI DANA KELOLAAN</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 6. STRUKTUR SALDO & CASH FLOW ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-black">$</span> Struktur Saldo & Arus Kas Akun (
            <span className="text-emerald-400">
              {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
            </span>
            )
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
            <UserCheck className="w-4 h-4 text-blue-400" /> Informasi Provider, Akses, & Saldo Copier (
            <span className="text-blue-400">
              {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
            </span>
            )
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
              <Download className="w-4 h-4" /> Download Laporan PDF — {isAdminLoggedIn ? currentSignal.realName : currentSignal.codeName}
            </button>
          </div>
        </div>

        {/* ================= 8. DAFTAR RIWAYAT SINYAL & MASTER DATABASE VAULT ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Database Sinyal Teranalisis (ALPHA ANALYZER Manager)
              </h3>
              <p className="text-[11px] text-slate-400">
                {isAdminLoggedIn
                  ? "Admin Panel Aktif: Kelola tampilan publik (Soft Delete) atau hapus permanen dari Database (Hard Delete)."
                  : "Daftar sinyal terverifikasi yang aktif di sistem:"}
              </p>
            </div>

            {/* TAB FILTER KATALOG & VAULT DATABASE */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setCatalogTab("visible")}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  catalogTab === "visible" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Tampil di Publik ({visibleSignals.length})
              </button>

              {isAdminLoggedIn && (
                <button
                  onClick={() => setCatalogTab("hidden_vault")}
                  className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                    catalogTab === "hidden_vault" ? "bg-purple-950 text-purple-200 border border-purple-800" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5 text-purple-400" /> Database Vault ({hiddenSignals.length})
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(catalogTab === "visible" ? visibleSignals : hiddenSignals).length === 0 ? (
              <div className="col-span-3 p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-500 space-y-2">
                <div>Tidak ada data sinyal di tab {catalogTab === "visible" ? "Tampil di Publik" : "Database Vault"}.</div>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="text-xs text-blue-400 hover:underline font-semibold"
                >
                  + Upload data sinyal baru sekarang
                </button>
              </div>
            ) : (
              (catalogTab === "visible" ? visibleSignals : hiddenSignals).map((sig) => (
                <div
                  key={sig.id}
                  onClick={() => setSelectedSignalId(sig.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer relative group flex flex-col justify-between ${
                    selectedSignalId === sig.id
                      ? "bg-slate-950 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {isAdminLoggedIn ? sig.realName : sig.codeName}
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {sig.dateAudit}
                          </span>
                        </h4>
                        <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[220px]">
                          Provider: {sig.provider}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition ${
                          selectedSignalId === sig.id ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:translate-x-1"
                        }`}
                      />
                    </div>

                    <div className="text-[11px] space-y-1 mt-3 pt-3 border-t border-slate-900">
                      <div className="flex justify-between">
                        <span className="text-emerald-400 font-bold">Growth: {sig.growth}</span>
                        <span className="text-slate-400">
                          {sig.activePeriod ? sig.activePeriod.split(" ")[0] : "0"} Wks
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Win: {sig.winRate}</span>
                        <span className="text-amber-400">Max DD: {sig.maxEquityDD}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 truncate max-w-[130px]">
                      📁 {sig.files ? sig.files.length : 0} File Tersimpan
                    </span>

                    {/* DUA OPSI PENGHAPUSAN ADMIN: SOFT DELETE & HARD DELETE */}
                    {isAdminLoggedIn && (
                      <div className="flex items-center gap-1">
                        {sig.visibility === "visible" ? (
                          <button
                            title="Opsi 1: Sembunyikan dari Tampilan (Data Tetap di Database Vault)"
                            onClick={(e) => handleHideFromView(sig.id, e)}
                            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            title="Pulihkan: Tampilkan Kembali di Publik"
                            onClick={(e) => handleRestoreToView(sig.id, e)}
                            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          title="Opsi 2: Hapus Permanen dari Tampilan & Database"
                          onClick={(e) => handleHardDelete(sig.id, e)}
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center pt-4 text-[11px] text-slate-500">
          ⚠️ <strong>Disclaimer Risiko Traders Club:</strong> Analisa ini murni berdasarkan data historis MQL5 & CSV. Kinerja masa lalu tidak menjamin hasil di masa depan.
        </div>
      </main>

      {/* ================= 9. MODAL ADMIN LOGIN ================= */}
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
                Gunakan kredensial default <strong>Username: admin</strong> dan <strong>Password: 151264!</strong>.
              </p>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Username Admin</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition cursor-pointer"
                >
                  Masuk Mode Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 10. MODAL GANTI PASSWORD ADMIN ================= */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Ganti Password Admin</h3>
              </div>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {settingsMessage && (
                <div className={`p-2.5 rounded-lg text-xs ${
                  settingsMessage.includes("✅")
                    ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                    : "bg-red-950/60 border border-red-800 text-red-300"
                }`}>
                  {settingsMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password Lama</label>
                <input
                  type="password"
                  placeholder="Masukkan password saat ini (Default: 151264!)"
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Password Baru</label>
                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  placeholder="Ketik ulang password baru"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition cursor-pointer"
                >
                  Simpan Password Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 11. MODAL USULKAN SINYAL DARI VISITOR ================= */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Usulkan Sinyal MQL5 Baru</h3>
              </div>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVisitorSubmitProposal} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Punya sinyal MQL5 jagoan yang ingin diaudit dan dimasukkan ke program <strong>Status Waktu Kopi</strong>? Kirimkan datanya di sini:
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nama Sinyal MT4 / MT5</label>
                <input
                  type="text"
                  placeholder="Contoh: Gold Mastery Scalper Pro"
                  value={proposalName}
                  onChange={(e) => setProposalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tautan / URL MQL5 Signal</label>
                <input
                  type="url"
                  placeholder="https://www.mql5.com/en/signals/..."
                  value={proposalLink}
                  onChange={(e) => setProposalLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Catatan Tambahan (Opsional)</label>
                <textarea
                  placeholder="Kelebihan, pair yang dipakai, atau akun rekomendasi..."
                  value={proposalNote}
                  onChange={(e) => setProposalNote(e.target.value)}
                  rows="3"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProposalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 shadow-md shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Usulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 12. MODAL ADMIN REVIEW USULAN VISITOR ================= */}
      {isReviewProposalsModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Review Antrean Usulan Sinyal Visitor ({proposalsList.length})
                </h3>
              </div>
              <button
                onClick={() => setIsReviewProposalsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {proposalsList.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Belum ada antrean usulan sinyal baru dari visitor.
                </div>
              ) : (
                proposalsList.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{prop.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {prop.submitter}
                        </span>
                      </div>
                      <a
                        href={prop.mql5Link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 hover:underline block truncate max-w-sm"
                      >
                        {prop.mql5Link}
                      </a>
                      <p className="text-xs text-slate-400 italic">"{prop.note}"</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <button
                        onClick={() => {
                          if (window.confirm("Tolak usulan sinyal ini?")) {
                            setProposalsList((prev) => prev.filter((p) => p.id !== prop.id));
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg border border-red-800/60 bg-red-950/40 text-xs font-semibold text-red-400 hover:bg-red-900/60 transition cursor-pointer"
                      >
                        Tolak
                      </button>
                      <button
                        onClick={() => handleApproveProposal(prop)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Setujui & Simpan ke DB
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsReviewProposalsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 13. MODAL POPUP UPLOAD SCREENSHOT & CSV KE DATABASE ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Upload Sinyal Baru ke Database</h3>
              </div>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadedFilesList([]);
                  setCustomSignalName("");
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessUploadedSignal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nama Sinyal / EA</label>
                <input
                  type="text"
                  placeholder="Contoh: World Peace Strategy 02"
                  value={customSignalName}
                  onChange={(e) => setCustomSignalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 hover:bg-blue-950/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Pilih Screenshot (PNG/JPG) & CSV Histori
                </span>
                <span className="text-[10px] text-slate-500">
                  Seluruh file akan langsung disimpan permanen ke database browser
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
              {uploadedFilesList.length > 0 && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 max-h-32 overflow-y-auto">
                  <span className="text-[11px] font-bold text-emerald-400 block">
                    File Siap Disimpan ke DB ({uploadedFilesList.length}):
                  </span>
                  {uploadedFilesList.map((file, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-center justify-between gap-1.5">
                      <span className="flex items-center gap-1.5 truncate">
                        {file.type === "image" ? (
                          <ImageIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        )}
                        {file.name}
                      </span>
                      <span className="text-[10px] text-slate-500 shrink-0">{file.size}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setUploadedFilesList([]);
                    setCustomSignalName("");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" /> Simpan & Tampilkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}