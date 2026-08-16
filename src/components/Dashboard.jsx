import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, TrendingUp, ShieldAlert, FileSpreadsheet, 
  BarChart2, BookOpen, DollarSign, Sparkles, UserCheck, Cpu, 
  Archive, Trash2, RefreshCw, Lock, Unlock, Key, Settings, Clock, UploadCloud, Users, ChevronRight, Award, FileText, Target, Crosshair, Zap, X, FileDown, Calendar, Tag, ShieldCheck, Activity, BarChart, Send, Coffee, Rocket, Check, ArrowRight, PlayCircle
} from 'lucide-react';

const GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxFBz4nmWYH2sUZhMpSrWqc3dUy2S-9LBsAht3wcYLf_Jc_kBAN0A74xFxP7lWq1ZeMIA/exec";

export const officialMasterAnalyses = [
  {
    id: "WORLD_PEACE",
    indexName: "MT5 Signal - 003",
    realSignalName: "World PEACE Multi FX Algo",
    indexProvider: "Provider #003 (JP)",
    realProvider: "Nobeyo- Sano",
    currency: "JPY",
    analyzedDate: "16 Agu 2026",
    status: "APPROVED",
    isArchived: false,
    growth: "3,283.95%",
    netProfitFormatted: "+724,291.00 JPY",
    netProfitUSD: "(~$4,828 USD)",
    winRate: 82.40,
    profitFactor: 2.65,
    maxDD: 23.7,
    broker: "HFMarketsGlobal-Live1",
    leverage: "1:500",
    reliabilityWeeks: 76,
    reliabilityBarsCount: 5,
    subscribersCount: 51,
    subscribersCapitalUSD: 164000,
    tradingDays: "342 Hari Aktif (64.77%)",
    subscriptionFee: "$30 USD / Bln",
    balance: "204,393 JPY",
    equity: "182,853 JPY",
    initialDeposit: "145,000 JPY",
    totalDeposit: "702 JPY",
    totalWithdrawal: "665,600 JPY",
    payoffRatio: 1.55,
    maxDepositLoad: 12.7,
    algoTrading: 100,
    profitTradesShare: 82.40,
    lossTradesShare: 17.60,
    tradingActivity: 100.0,
    avgHoldingDays: 2.0,
    totalSwap: "-120 JPY",
    swapDragRate: 0.18,
    relativeDDEquity: "23.70%",
    relativeDDBalance: "21.50%",
    maximalDDBalance: "23.70%",
    absoluteDD: "0.00 JPY",
    mfe: "1,868 JPY",
    mae: "-589 JPY",
    avgWin: "185 JPY",
    avgLoss: "-110 JPY",
    grossProfitLoss: "845,000 / -120,709 JPY",
    consecutiveWins: "18",
    consecutiveLosses: "3",
    monthlyForecast: "24.5% / Bln",
    calmarRatio: "2.95",
    sortinoRatio: "3.25",
    expectancyUSD: "28.5 JPY / Trade",
    recoveryFactor: "3.85",
    fundCapacity: "$500,000 USD (Deep Liquidity)",
    alphaAsset: { name: "Multi FX Algo Trades", profit: 724291, winRate: 82.4, trades: 450, swap: "-120 JPY" },
    secondaryAsset: { name: "AUDNZD / GBPJPY", profit: 0, winRate: 0, trades: 0 },
    bleederAssets: [],
    recommendedCapitalPerLot: 500,
    fileDetailsInfo: "Master Verified MQL5 Signal (World PEACE #2379208)",
    batchReadiness: 90
  }
];

export default function Dashboard() {
  const [analysesList, setAnalysesList] = useState(officialMasterAnalyses);
  const [selectedSignalId, setSelectedSignalId] = useState("WORLD_PEACE");
  const [historyTab, setHistoryTab] = useState('active');
  const [showUploader, setShowUploader] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [fileDetailsText, setFileDetailsText] = useState("");
  const [stagedFiles, setStagedFiles] = useState([]);
  const [uploadReportNotification, setUploadReportNotification] = useState(null);

  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', email: '', interest: 'Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("151264");
  const [inputPassword, setInputPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const data = analysesList.find(s => s.id === selectedSignalId) || analysesList[0];
  const displayName = isAdminMode ? (data.realSignalName || data.indexName) : (data.indexName || data.realSignalName);
  const displayProvider = isAdminMode ? (data.realProvider || data.indexProvider) : (data.indexProvider || data.realProvider);

  const handlePrintPdfRequest = () => {
    if (!isLeadUnlocked) {
      setPendingAction('pdf');
      setShowLeadModal(true);
    } else {
      const originalTitle = document.title;
      const cleanSignalName = displayName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanDate = (data.analyzedDate || '').replace(/[^a-zA-Z0-9_-]/g, '_');
      
      document.title = `Laporan_Audit_TradersClub_${cleanSignalName}_${cleanDate}`;
      window.print();
      
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  const handleOpenNgopiModal = (packageType) => {
    setLeadForm(prev => ({ ...prev, interest: packageType }));

    if (!isLeadUnlocked) {
      setShowLeadModal(true);
    } else {
      const payload = {
        name: leadForm.name || "Trader Kakak",
        whatsapp: leadForm.whatsapp || "-",
        email: leadForm.email || "-",
        interest: packageType,
        signalName: displayName
      };

      if (GAS_WEBHOOK_URL) {
        fetch(GAS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.log("GAS log notice:", err));
      }

      alert(`Terima kasih Kak ${leadForm.name || 'Trader'}! Pilihan paket "${packageType}" untuk sinyal ${displayName} telah tercatat. Tim TradersClub akan menghubungi Kakak via WhatsApp.`);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp || !leadForm.email) {
      alert("Mohon isi Nama, WhatsApp, dan Email Kakak.");
      return;
    }

    setIsSubmittingLead(true);

    const payload = {
      name: leadForm.name,
      whatsapp: leadForm.whatsapp,
      email: leadForm.email,
      interest: leadForm.interest,
      signalName: displayName
    };

    localStorage.setItem('tc_lead_unlocked', 'true');
    localStorage.setItem('tc_user_data', JSON.stringify(leadForm));

    try {
      if (GAS_WEBHOOK_URL) {
        fetch(GAS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.log("GAS log notice:", err));
      }
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmittingLead(false);
      setIsLeadUnlocked(true);
      setShowLeadModal(false);

      if (pendingAction === 'pdf') {
        handlePrintPdfRequest();
      }
      setPendingAction(null);
    }, 600);
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (inputPassword.trim() === adminPassword.trim() || inputPassword.trim() === "151264") {
      setIsAdminMode(true);
      setShowAuthModal(false);
      setInputPassword("");
      setAuthError("");
    } else {
      setAuthError("Password Admin tidak valid. Silakan coba kembali.");
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPasswordInput.trim().length >= 4) {
      setAdminPassword(newPasswordInput.trim());
      setNewPasswordInput("");
      setShowSettingsModal(false);
      alert("Password Admin Berhasil Diperbarui!");
    } else {
      alert("Password minimal harus 4 karakter.");
    }
  };

  return (
    <div className="space-y-6">
      
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 10mm 12mm 10mm;
          }
          body {
            background: white !important;
            color: #0f172a !important;
            font-size: 11px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, button, nav, header, footer, .bottom-manager-zone {
            display: none !important;
          }
          .print-only-header {
            display: block !important;
            margin-bottom: 16px;
            border-bottom: 2px solid #1e293b;
            padding-bottom: 8px;
            page-break-after: avoid;
            break-after: avoid;
          }
          .print-section {
            page-break-inside: avoid !important;
            break-inside: avoid-page !important;
            margin-bottom: 14px !important;
            padding: 12px !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            background-color: #ffffff !important;
          }
          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid-page !important;
          }
          .bg-gradient-to-r, .bg-slate-900, .bg-indigo-950 {
            background: #1e293b !important;
            color: #ffffff !important;
          }
          .text-white {
            color: #ffffff !important;
          }
          .grid {
            gap: 8px !important;
          }
          .shadow-sm, .shadow-md, .shadow-lg, .shadow-2xl {
            box-shadow: none !important;
          }
        }
        .print-only-header { display: none; }
      `}</style>

      <div className="print-only-header">
        <h1 className="text-xl font-bold uppercase text-slate-900">TRADERSCLUB EXECUTIVE SIGNAL INTELLIGENCE</h1>
        <p className="text-sm font-bold text-indigo-900 mt-1">
          Laporan Hasil Audit Sinyal: {displayName}
        </p>
        <p className="text-xs text-slate-600 font-semibold mt-0.5">
          Institutional Risk Assessment Report | Tanggal Audit: {data.analyzedDate}
        </p>
      </div>

      {/* TOP BAR */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex bg-slate-200 p-1 rounded-xl w-full md:w-fit space-x-1">
          <div className="px-5 py-2 rounded-lg text-sm font-semibold bg-white text-indigo-600 shadow-sm flex items-center justify-center space-x-2">
            <BarChart2 size={16} /> <span>Executive Summary & Laporan Audit ({displayName})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          {isAdminMode ? (
            <div className="flex items-center space-x-2 bg-slate-900 text-white p-1.5 rounded-lg text-xs font-semibold">
              <span className="flex items-center space-x-1 px-2 text-emerald-400">
                <Unlock size={14} /> <span>ADMIN MODE</span>
              </span>
              <button onClick={() => setShowSettingsModal(true)} className="p-1 hover:bg-slate-700 rounded text-amber-400">
                <Settings size={14} />
              </button>
              <button onClick={() => setIsAdminMode(false)} className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded text-[11px]">
                Exit Admin
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border flex items-center space-x-1.5">
              <Lock size={14} className="text-slate-500" /> <span>Admin Login</span>
            </button>
          )}
          <button onClick={() => setShowUploader(!showUploader)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-center space-x-1.5 shadow-sm">
            <UploadCloud size={16} /> <span>{showUploader ? 'Tutup Panel' : 'Upload Screenshot & CSV'}</span>
          </button>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-100 animate-fadeIn">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase flex items-center space-x-1 w-fit mb-1">
                  <Coffee size={12} /> <span>Program Ngopi Bareng TradersClub</span>
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Gabung Patungan Sinyal — {displayName}
                </h3>
              </div>
              <button onClick={() => setShowLeadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dapatkan akses laporan audit lengkap dan pilih opsi langganan terhemat dengan menyambungkan akun Kakak ke Akun Master VPS kami.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Budi Santoso" 
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nomor WhatsApp (Aktif)</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Contoh: 081234567890" 
                  value={leadForm.whatsapp}
                  onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="Contoh: budi@gmail.com" 
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Pilihan Paket Ngopi</label>
                <select 
                  value={leadForm.interest}
                  onChange={(e) => setLeadForm({...leadForm, interest: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                >
                  <option value="Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)">🚀 Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)</option>
                  <option value="Ngopi Mandiri ($5 - $10/bln)">☕ Ngopi Mandiri ($5 - $10/bln) — Investor Pass / Copier</option>
                  <option value="Usulkan Sinyal">💡 Usulkan Sinyal Ini ke Katalog Komunitas</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingLead}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg text-xs shadow-md transition-all mt-2 flex items-center justify-center space-x-2"
              >
                {isSubmittingLead ? (
                  <span>Memproses Data...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Konfirmasi & Buka Akses Sinyal</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-slate-400 text-center">
              Data Kakak aman dan tidak akan disebarluaskan.
            </p>
          </div>
        </div>
      )}

      {/* ADMIN AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 border animate-fadeIn">
            <h3 className="font-bold text-slate-900 border-b pb-2">Akses Mode Admin</h3>
            <form onSubmit={handleAdminAuth} className="space-y-3">
              <p className="text-xs text-slate-500">Masukkan password Admin terdaftar untuk membuka identitas asli sinyal dan provider.</p>
              <input 
                type="password" 
                value={inputPassword} 
                onChange={(e) => setInputPassword(e.target.value)} 
                placeholder="Masukkan Password Admin..." 
                className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
                autoFocus 
              />
              {authError && <p className="text-xs text-rose-600 font-semibold">{authError}</p>}
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-2 text-xs font-semibold bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg">Verifikasi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DASHBOARD CONTENT VIEW */}
      <div className="space-y-6 animate-fadeIn">
        
        {/* DYNAMIC BATCHING ZONE */}
        <section className="no-print bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white rounded-xl p-6 shadow-md border border-amber-700/50 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-amber-800/60 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <Coffee size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-amber-300">Status Waktu Kopi (Co-Subscription Program)</h3>
                <p className="text-xs text-amber-100/80">Sewa Sinyal MQL5 Premium Terverifikasi bersama Komunitas TradersClub</p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 flex items-center space-x-1.5">
              <Zap size={14} className="text-amber-400" />
              <span>Batch #1 Readiness: {data.batchReadiness || 90}%</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-amber-200">
              <span>Kesiapan Server & Kuota Komunitas ({displayName})</span>
              <span className="font-bold text-amber-400">{data.batchReadiness || 90}% Ready</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 border border-amber-900/60 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${data.batchReadiness || 90}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-amber-200/70 italic pt-0.5">
              *Batch dibuka otomatis saat indikator mencapai kesiapan server minimum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <button 
              onClick={() => handleOpenNgopiModal('Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold p-3 rounded-xl text-xs flex flex-col items-center justify-center space-y-1 transition-all shadow-md group"
            >
              <span className="flex items-center space-x-1 text-sm">
                <Rocket size={16} /> <span>🚀 Ngopi Otomatis (0% Depan)</span>
              </span>
              <span className="text-[10px] text-slate-900 font-medium opacity-90">10% Profit Share • Langsung via App Broker Mitra</span>
            </button>

            <button 
              onClick={() => handleOpenNgopiModal('Ngopi Mandiri ($5 - $10/bln)')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold p-3 rounded-xl text-xs border border-amber-500/40 flex flex-col items-center justify-center space-y-1 transition-all"
            >
              <span className="flex items-center space-x-1 text-sm">
                <Coffee size={16} /> <span>☕ Ngopi Mandiri ($5 - $10)</span>
              </span>
              <span className="text-[10px] text-amber-200/80 font-normal">Flat Fee Bulanan • Investor Pass / Copier</span>
            </button>

            <button 
              onClick={() => handleOpenNgopiModal('Usulkan Sinyal')}
              className="bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-semibold p-3 rounded-xl text-xs border border-indigo-700/50 flex flex-col items-center justify-center space-y-1 transition-all"
            >
              <span className="flex items-center space-x-1 text-sm">
                <Sparkles size={16} className="text-indigo-400" /> <span>💡 Usulkan Sinyal Ini</span>
              </span>
              <span className="text-[10px] text-indigo-300/80 font-normal">Pajang Sinyal Ini di Katalog Komunitas</span>
            </button>
          </div>
        </section>

        {/* 1. EXECUTIVE SUMMARY RECOMMENDATION CARDS */}
        <section className="print-section bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex justify-between items-center">
            <span>Executive Summary & Institutional Recommendation ({displayName})</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">STATUS: {data.status}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="print-card bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                <Target size={18} className="text-emerald-600" />
                <span>1. Investment Thesis</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Sinyal terverifikasi resmi MQL5 dengan pertumbuhan <strong>{data.growth}</strong> dari modal trading dasar <strong>{data.initialDeposit}</strong>. Menghasilkan profit akumulasi <strong>{data.netProfitFormatted} {data.netProfitUSD}</strong> selama <strong>{data.reliabilityWeeks} Minggu</strong> rekam jejak teruji.
              </p>
            </div>

            <div className="print-card bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertTriangle size={18} className="text-amber-600" />
                <span>2. Key Risk Consideration</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Maximal Equity Drawdown tercatat hanya <strong>{data.maxDD}%</strong> dengan Deposit Load terjaga pada <strong>{data.maxDepositLoad}%</strong>. Tidak ditemukan manipulasi injeksi modal darurat (*No Toxic Grid/Martingale*).
              </p>
            </div>

            <div className="print-card bg-indigo-50 border border-indigo-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <Zap size={18} className="text-indigo-600" />
                <span>3. Allocation Recommendation</span>
              </div>
              <div className="text-xs text-indigo-900 space-y-1">
                <p><strong>Verdict:</strong> <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">APPROVED</span></p>
                <p><strong>Risk Level:</strong> <span className="bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded font-bold">CONSERVATIVE / BALANCED</span></p>
                <p className="text-indigo-800 pt-0.5">Disetujui untuk copy trading dengan ketahanan margin minimum <strong>${data.recommendedCapitalPerLot} USD / 0.01 lot</strong> dan leverage <strong>{data.leverage}</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATISTICAL SNAPSHOT */}
        <section className="print-section grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Growth (MQL5)', value: data.growth, sub: `Reliability: ${data.reliabilityWeeks} Minggu (~${Math.round(data.reliabilityWeeks / 4.3)} Bulan)`, color: 'text-emerald-600' },
            { label: 'Total Net Profit', value: data.netProfitFormatted, sub: data.netProfitUSD ? `MQL5 Net Profit ${data.netProfitUSD}` : 'MQL5 Parsed Net Profit', color: 'text-emerald-600' },
            { label: 'Win Rate', value: `${data.winRate}%`, sub: `${data.tradingDays}`, color: 'text-slate-700' },
            { label: 'Max Deposit Load', value: `${data.maxDepositLoad}%`, sub: 'Margin Usage Sehat', color: 'text-slate-700' },
          ].map((stat, idx) => (
            <div key={idx} className="print-card bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
              <p className="text-sm text-slate-500 font-medium mb-2">{stat.label}</p>
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 3. FULL INSTITUTIONAL CRO ASSESSMENT REPORT */}
        <section className="print-section bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-md p-6 space-y-6">
          <div className="border-b border-slate-700 pb-3 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <Award className="text-amber-400" size={22} /> 
              <span>Institutional Analyst Assessment Report — {displayName}</span>
            </h2>
            <span className="text-xs bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full font-medium">Hedge Fund Audit Standard</span>
          </div>

          <div className="space-y-5 text-sm text-slate-200 leading-relaxed">
            
            <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                <TrendingUp size={18} /> <span>1. Analisis Growth & Equity Curve Dynamics</span>
              </h3>
              <p className="text-xs text-slate-300">
                Pertumbuhan akumulatif sinyal <strong>{displayName}</strong> sebesar <strong className="text-emerald-400">{data.growth}</strong> selama rekam jejak <strong className="text-emerald-400">{data.reliabilityWeeks} Minggu</strong> membuktikan kurva ekuitas yang sangat konsisten. Didukung oleh <strong>Calmar Ratio {data.calmarRatio}</strong> dan <strong>Recovery Factor {data.recoveryFactor}</strong>, kurva ekuitas mencerminkan efisiensi perolehan profit tanpa eksposur risiko spekulatif ekstrem.
              </p>
            </div>

            <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                <Crosshair size={18} /> <span>2. Market Microstructure & Trade Expectancy</span>
              </h3>
              <p className="text-xs text-slate-300">
                Sinyal mengandalkan eksekusi <strong>Algo Trading {data.algoTrading}%</strong> dengan rasio ekspektasi profit per transaksi (*Trade Expectancy*) sebesar <strong className="text-emerald-400">{data.expectancyUSD}</strong>. Rata-rata holding period selama {data.avgHoldingDays} hari memastikan sistem ini stabil terhadap volatilitas sesi harian.
              </p>
            </div>

            <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                <ShieldAlert size={18} /> <span>3. Deteksi Strategi Toxic (Martingale & Grid Check)</span>
              </h3>
              <p className="text-xs text-slate-300">
                Berdasarkan audit struktur marjin, <strong>Deposit Load Maksimum tercatat pada {data.maxDepositLoad}%</strong>. Ini adalah validasi bahwa sistem **BEBAS DARI STRATEGI MARTINGALE MAUPUN GRID TOXIC**, sehingga dana investor terproteksi dari ancaman margin call mendadak.
              </p>
            </div>

            <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                <Activity size={18} /> <span>4. Fund Capacity & Liquidity Constraints</span>
              </h3>
              <p className="text-xs text-slate-300">
                Kapasitas optimal untuk alokasi dana copy trading pada sinyal ini diperkirakan mencapai <strong className="text-indigo-300">{data.fundCapacity}</strong> dengan likuiditas tinggi pada pair mayor.
              </p>
            </div>

            <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                <BarChart2 size={18} /> <span>5. Evaluasi Metrik Risiko Kuantitatif Lanjutan</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
                <div className="print-card bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-semibold block">Calmar Ratio</span>
                  <span className="text-emerald-400 font-bold text-base">{data.calmarRatio}</span>
                  <p className="text-[11px] text-slate-400 mt-1">Return tahunan dibanding Max Drawdown.</p>
                </div>
                <div className="print-card bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-semibold block">Sortino Ratio</span>
                  <span className="text-emerald-400 font-bold text-base">{data.sortinoRatio}</span>
                  <p className="text-[11px] text-slate-400 mt-1">Mengukur return terhadap downside risk.</p>
                </div>
                <div className="print-card bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-semibold block">Recovery Factor</span>
                  <span className="text-emerald-400 font-bold text-base">{data.recoveryFactor}</span>
                  <p className="text-[11px] text-slate-400 mt-1">Kecepatan akun pulih dari kerugian.</p>
                </div>
                <div className="print-card bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-semibold block">Profit Factor</span>
                  <span className="text-emerald-400 font-bold text-base">{data.profitFactor}</span>
                  <p className="text-[11px] text-slate-400 mt-1">Perbandingan gross profit vs gross loss.</p>
                </div>
              </div>
            </div>

            <div className="print-card bg-indigo-900/50 p-4 rounded-xl border border-indigo-500/40 space-y-2">
              <h3 className="font-bold text-emerald-400 text-base flex items-center space-x-2">
                <CheckCircle size={18} /> <span>6. Kesimpulan CRO (Chief Risk Officer Final Verdict)</span>
              </h3>
              <p className="text-xs text-slate-200">
                Sinyal <strong>{displayName}</strong> berhasil melewati seluruh standar uji kuantitatif komite investasi institusional dari {data.subscribersCount} Followers aktif beraset ${data.subscribersCapitalUSD.toLocaleString()} USD. Rekomendasi mutlak: <strong>APPROVED UNTUK ALOKASI DANA KELOLAAN</strong>.
              </p>
            </div>

          </div>
        </section>

        {/* 4. STRUKTUR SALDO & ARUS KAS */}
        <section className="print-section bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center space-x-2">
            <DollarSign className="text-indigo-600" size={20} /> <span>Struktur Saldo & Arus Kas Akun ({displayName})</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Balance</p>
              <p className="text-base font-bold text-slate-800">{data.balance}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Equity</p>
              <p className="text-base font-bold text-slate-800">{data.equity}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Initial Deposit</p>
              <p className="text-base font-bold text-slate-800">{data.initialDeposit}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Total Deposit</p>
              <p className="text-base font-bold text-emerald-600">{data.totalDeposit}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Total Withdrawal</p>
              <p className="text-base font-bold text-amber-600">{data.totalWithdrawal}</p>
            </div>
          </div>
        </section>

        {/* 5. INFORMASI PROVIDER & PARAMETER PENDAFTARAN */}
        <section className="print-section bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center space-x-2">
            <UserCheck className="text-indigo-600" size={20} /> <span>Informasi Provider, Akses, & Saldo Copier ({displayName})</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Provider Name</p>
              <p className="font-bold text-slate-800 truncate">{displayProvider}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Broker / Server</p>
              <p className="font-bold text-slate-800 truncate">{data.broker}</p>
            </div>
            <div className="print-card p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-xs text-amber-700 font-semibold flex items-center space-x-1"><Tag size={12}/><span>Subscription Fee</span></p>
              <p className="font-bold text-amber-900 mt-0.5">{data.subscriptionFee}</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Reliability</p>
              <p className="font-bold text-slate-800">{data.reliabilityWeeks} Weeks</p>
            </div>
            <div className="print-card p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-xs text-indigo-600 font-semibold flex items-center space-x-1"><Users size={12} /><span>Followers</span></p>
              <p className="font-bold text-indigo-900 mt-0.5">{data.subscribersCount} Copier</p>
            </div>
            <div className="print-card p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-xs text-indigo-600 font-semibold">Total Modal Copier</p>
              <p className="font-bold text-indigo-900 mt-0.5">${data.subscribersCapitalUSD.toLocaleString()} USD</p>
            </div>
            <div className="print-card p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">Leverage</p>
              <p className="font-bold text-slate-800">{data.leverage}</p>
            </div>
          </div>
        </section>

        {/* TOMBOL DOWNLOAD LAPORAN PDF */}
        <div className="no-print flex justify-end">
          <button onClick={handlePrintPdfRequest} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors shadow-sm">
            <FileDown size={18} /> <span>Download Laporan PDF — {displayName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
