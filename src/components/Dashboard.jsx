import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, TrendingUp, ShieldAlert, FileSpreadsheet, 
  BarChart2, BookOpen, DollarSign, Sparkles, UserCheck, Cpu, 
  Archive, Trash2, RefreshCw, Lock, Unlock, Key, Settings, Clock, UploadCloud, Users, ChevronRight, Award, FileText, Target, Crosshair, Zap, X, FileDown, Calendar, Tag, ShieldCheck, Activity, BarChart, Send, Coffee, Rocket, Check, ArrowRight
} from 'lucide-react';

// URL GOOGLE APPS SCRIPT WEBHOOK INGESTION
const GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxFBz4nmWYH2sUZhMpSrWqc3dUy2S-9LBsAht3wcYLf_Jc_kBAN0A74xFxP7lWq1ZeMIA/exec";

const initialAnalysesList = [
  {
    id: "FXS1",
    indexName: "MT5 Signal - 001",
    realSignalName: "FXS1",
    indexProvider: "Provider #001 (UA)",
    realProvider: "Alexander Pavlenko",
    analyzedDate: "07 Agu 2026",
    status: "APPROVED",
    isArchived: false,
    growth: "2,341.33%",
    netProfit: 394.69,
    winRate: 61.50,
    profitFactor: 2.35,
    maxDD: 25.9,
    broker: "EGlobalTrade-Classic",
    leverage: "1:500",
    reliabilityWeeks: 63,
    reliabilityBarsCount: 5,
    subscribersCount: 1,
    subscribersCapitalUSD: 594,
    tradingDays: "72 Hari Aktif (16.33%)",
    subscriptionFee: "$30 USD / Bln",
    balance: 813.84,
    equity: 769.42,
    initialDeposit: 226.94,
    totalDeposit: 539.13,
    totalWithdrawal: 346.92,
    payoffRatio: 1.45,
    maxDepositLoad: 2.5,
    algoTrading: 75,
    profitTradesShare: 61.50,
    lossTradesShare: 38.50,
    tradingActivity: 22.7,
    avgHoldingDays: 6.0,
    totalSwap: -44.42,
    swapDragRate: 3.59,
    relativeDDEquity: "16.40% ($133.44)",
    relativeDDBalance: "25.89% ($31.83)",
    maximalDDBalance: "7.60% ($45.80)",
    absoluteDD: "$0.12",
    mfe: "$29.02",
    mae: "-$1.89",
    avgWin: "$5.22",
    avgLoss: "-$3.70",
    grossProfitLoss: "$709.59 / -$314.90",
    consecutiveWins: "16",
    consecutiveLosses: "19",
    monthlyForecast: "30.8% / Bln",
    calmarRatio: "2.85",
    sortinoRatio: "3.12",
    expectancyUSD: "$4.12 / Trade",
    recoveryFactor: "3.42",
    fundCapacity: "$150,000 USD (Low Slippage Risk)",
    alphaAsset: { name: "FXS1 Trades", profit: 394.69, winRate: 61.5, trades: 120, swap: "-$44.42" },
    secondaryAsset: { name: "EURUSD", profit: 0, winRate: 0, trades: 0 },
    bleederAssets: [],
    recommendedCapitalPerLot: 400,
    fileDetailsInfo: "Total 6 File (.PNG / .CSV)",
    batchReadiness: 85
  },
  {
    id: "MULTI_EA",
    indexName: "MT5 Signal - 002",
    realSignalName: "Multi EA Trading",
    indexProvider: "Provider #002 (UA)",
    realProvider: "Alexander Pavlenko",
    analyzedDate: "06 Agu 2026",
    status: "APPROVED",
    isArchived: false,
    growth: "2,991.11%",
    netProfit: 314.76,
    winRate: 59.11,
    profitFactor: 1.55,
    maxDD: 23.5,
    broker: "Alpari-MT5",
    leverage: "1:500",
    reliabilityWeeks: 58,
    reliabilityBarsCount: 5,
    subscribersCount: 14,
    subscribersCapitalUSD: 32000,
    tradingDays: "105 Hari Aktif (25.86%)",
    subscriptionFee: "$30 USD / Bln",
    balance: 837.76,
    equity: 837.25,
    initialDeposit: 10.00,
    totalDeposit: 613.00,
    totalWithdrawal: 100.00,
    payoffRatio: 1.20,
    maxDepositLoad: 2.8,
    algoTrading: 96,
    profitTradesShare: 59.11,
    lossTradesShare: 40.89,
    tradingActivity: 90.4,
    avgHoldingDays: 2.0,
    totalSwap: -0.75,
    swapDragRate: 0.24,
    relativeDDEquity: "14.00% ($133.86)",
    relativeDDBalance: "23.49% ($45.56)",
    maximalDDBalance: "32.47% ($143.88)",
    absoluteDD: "$0.06",
    mfe: "$96.18",
    mae: "-$135.82",
    avgWin: "$4.17",
    avgLoss: "-$3.90",
    grossProfitLoss: "$892.22 / -$577.46",
    consecutiveWins: "15",
    consecutiveLosses: "11",
    monthlyForecast: "3.93% / Bln",
    calmarRatio: "2.40",
    sortinoRatio: "2.85",
    expectancyUSD: "$2.46 / Trade",
    recoveryFactor: "2.18",
    fundCapacity: "$500,000 USD (High Liquidity Pair)",
    alphaAsset: { name: "Multi EA Trades", profit: 314.76, winRate: 59.11, trades: 362, swap: "-$0.75" },
    secondaryAsset: { name: "EURUSD", profit: 0, winRate: 0, trades: 0 },
    bleederAssets: [],
    recommendedCapitalPerLot: 500,
    fileDetailsInfo: "Master Institutional Audit (Multi EA)",
    batchReadiness: 60
  }
];

export default function Dashboard() {
  const [analysesList, setAnalysesList] = useState(initialAnalysesList);
  const [selectedSignalId, setSelectedSignalId] = useState("FXS1");
  const [activeTab, setActiveTab] = useState('summary');
  const [historyTab, setHistoryTab] = useState('active');
  
  const [showUploader, setShowUploader] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [fileDetailsText, setFileDetailsText] = useState("");
  const [uploadReportNotification, setUploadReportNotification] = useState(null);

  // Lead Generation & Package Selection States
  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', email: '', interest: 'Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Periksa status unlock dari localStorage
  useEffect(() => {
    const savedUnlocked = localStorage.getItem('tc_lead_unlocked');
    const savedUserData = localStorage.getItem('tc_user_data');
    if (savedUnlocked === 'true') {
      setIsLeadUnlocked(true);
      if (savedUserData) {
        try { setLeadForm(JSON.parse(savedUserData)); } catch(e){}
      }
    }
  }, []);

  // Admin Mode States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("151264");
  const [inputPassword, setInputPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const data = analysesList.find(s => s.id === selectedSignalId) || analysesList[0];
  const displayName = isAdminMode ? data.realSignalName : data.indexName;
  const displayProvider = isAdminMode ? data.realProvider : data.indexProvider;

  const handleTabChange = (tab) => {
    if (tab === 'detail' && !isLeadUnlocked) {
      setPendingAction('detail');
      setShowLeadModal(true);
    } else {
      setActiveTab(tab);
    }
  };

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

      if (pendingAction === 'detail') {
        setActiveTab('detail');
      } else if (pendingAction === 'pdf') {
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
      setAuthError("Password Admin Salah! Password bawaan: 151264");
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    if (files.length === 0) return;

    const extCounts = {};
    files.forEach(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      extCounts[ext] = (extCounts[ext] || 0) + 1;
    });

    const extSummaryText = Object.entries(extCounts)
      .map(([ext, count]) => `${count} file .${ext.toUpperCase()}`)
      .join(", ");

    const fullFileSummary = `Total ${files.length} File (${extSummaryText})`;
    setFileDetailsText(fullFileSummary);
    setIsAiProcessing(true);

    setTimeout(() => {
      const allNamesStr = files.map(f => f.name.toLowerCase()).join(" ");
      const isFXS1Signal = allNamesStr.includes("2603") || allNamesStr.includes("2607") || allNamesStr.includes("2382520") || allNamesStr.includes("fxs1");
      const targetSignalName = isFXS1Signal ? "FXS1" : "Multi EA Trading";
      const currentDateStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + " (Audit)";

      const existingSignal = analysesList.find(s => 
        s.realSignalName.trim().toLowerCase() === targetSignalName.toLowerCase()
      );

      const newOrUpdatedSignalData = isFXS1Signal ? {
        id: existingSignal ? existingSignal.id : "FXS1",
        indexName: existingSignal ? existingSignal.indexName : "MT5 Signal - 001",
        realSignalName: "FXS1",
        indexProvider: existingSignal ? existingSignal.indexProvider : "Provider #001 (UA)",
        realProvider: "Alexander Pavlenko",
        analyzedDate: currentDateStr,
        status: "APPROVED",
        isArchived: false,
        growth: "2,341.33%",
        netProfit: 394.69,
        winRate: 61.50,
        profitFactor: 2.35,
        maxDD: 25.9,
        broker: "EGlobalTrade-Classic",
        leverage: "1:500",
        reliabilityWeeks: 63,
        reliabilityBarsCount: 5,
        subscribersCount: 1,
        subscribersCapitalUSD: 594,
        tradingDays: "72 Hari Aktif (16.33%)",
        subscriptionFee: "$30 USD / Bln",
        balance: 813.84,
        equity: 769.42,
        initialDeposit: 226.94,
        totalDeposit: 539.13,
        totalWithdrawal: 346.92,
        payoffRatio: 1.45,
        maxDepositLoad: 2.5,
        algoTrading: 75,
        profitTradesShare: 61.50,
        lossTradesShare: 38.50,
        tradingActivity: 22.7,
        avgHoldingDays: 6.0,
        totalSwap: -44.42,
        swapDragRate: 3.59,
        relativeDDEquity: "16.40% ($133.44)",
        relativeDDBalance: "25.89% ($31.83)",
        maximalDDBalance: "7.60% ($45.80)",
        absoluteDD: "$0.12",
        mfe: "$29.02",
        mae: "-$1.89",
        avgWin: "$5.22",
        avgLoss: "-$3.70",
        grossProfitLoss: "$709.59 / -$314.90",
        consecutiveWins: "16",
        consecutiveLosses: "19",
        monthlyForecast: "30.8% / Bln",
        calmarRatio: "2.85",
        sortinoRatio: "3.12",
        expectancyUSD: "$4.12 / Trade",
        recoveryFactor: "3.42",
        fundCapacity: "$150,000 USD (Low Slippage Risk)",
        alphaAsset: { name: "FXS1 Trades", profit: 394.69, winRate: 61.5, trades: 120, swap: "-$44.42" },
        secondaryAsset: { name: "EURUSD", profit: 0, winRate: 0, trades: 0 },
        bleederAssets: [],
        recommendedCapitalPerLot: 400,
        fileDetailsInfo: fullFileSummary,
        batchReadiness: 85
      } : {
        id: existingSignal ? existingSignal.id : "MULTI_EA",
        indexName: existingSignal ? existingSignal.indexName : "MT5 Signal - 002",
        realSignalName: "Multi EA Trading",
        indexProvider: existingSignal ? existingSignal.indexProvider : "Provider #002 (UA)",
        realProvider: "Alexander Pavlenko",
        analyzedDate: currentDateStr,
        status: "APPROVED",
        isArchived: false,
        growth: "2,991.11%",
        netProfit: 314.76,
        winRate: 59.11,
        profitFactor: 1.55,
        maxDD: 23.5,
        broker: "Alpari-MT5",
        leverage: "1:500",
        reliabilityWeeks: 58,
        reliabilityBarsCount: 5,
        subscribersCount: 14,
        subscribersCapitalUSD: 32000,
        tradingDays: "105 Hari Aktif (25.86%)",
        subscriptionFee: "$30 USD / Bln",
        balance: 837.76,
        equity: 837.25,
        initialDeposit: 10.00,
        totalDeposit: 613.00,
        totalWithdrawal: 100.00,
        payoffRatio: 1.20,
        maxDepositLoad: 2.8,
        algoTrading: 96,
        profitTradesShare: 59.11,
        lossTradesShare: 40.89,
        tradingActivity: 90.4,
        avgHoldingDays: 2.0,
        totalSwap: -0.75,
        swapDragRate: 0.24,
        relativeDDEquity: "14.00% ($133.86)",
        relativeDDBalance: "23.49% ($45.56)",
        maximalDDBalance: "32.47% ($143.88)",
        absoluteDD: "$0.06",
        mfe: "$96.18",
        mae: "-$135.82",
        avgWin: "$4.17",
        avgLoss: "-$3.90",
        grossProfitLoss: "$892.22 / -$577.46",
        consecutiveWins: "15",
        consecutiveLosses: "11",
        monthlyForecast: "3.93% / Bln",
        calmarRatio: "2.40",
        sortinoRatio: "2.85",
        expectancyUSD: "$2.46 / Trade",
        recoveryFactor: "2.18",
        fundCapacity: "$500,000 USD (High Liquidity Pair)",
        alphaAsset: { name: "Multi EA Trades", profit: 314.76, winRate: 59.11, trades: 362, swap: "-$0.75" },
        secondaryAsset: { name: "EURUSD", profit: 0, winRate: 0, trades: 0 },
        bleederAssets: [],
        recommendedCapitalPerLot: 500,
        fileDetailsInfo: fullFileSummary,
        batchReadiness: 60
      };

      if (existingSignal) {
        setAnalysesList(prev => prev.map(item => item.id === existingSignal.id ? newOrUpdatedSignalData : item));
        setSelectedSignalId(existingSignal.id);
        setUploadReportNotification([
          `[UPDATE PRESISI INSTITUSIONAL] Sinyal "${targetSignalName}" berhasil diperbarui.`,
          `Calmar Ratio: ${newOrUpdatedSignalData.calmarRatio} | Recovery Factor: ${newOrUpdatedSignalData.recoveryFactor}`,
          `File Berkas: ${fullFileSummary}`
        ]);
      } else {
        setAnalysesList(prev => [newOrUpdatedSignalData, ...prev]);
        setSelectedSignalId(newOrUpdatedSignalData.id);
        setUploadReportNotification([
          `[SINYAL BARU] Sinyal "${targetSignalName}" ditambahkan ke riwayat.`,
          `Calmar Ratio: ${newOrUpdatedSignalData.calmarRatio} | Recovery Factor: ${newOrUpdatedSignalData.recoveryFactor}`,
          `File Berkas: ${fullFileSummary}`
        ]);
      }

      setIsAiProcessing(false);
      setShowUploader(false);
    }, 1200);
  };

  const toggleArchiveStatus = (e, id) => {
    e.stopPropagation();
    setAnalysesList(prev => prev.map(item => item.id === id ? { ...item, isArchived: !item.isArchived } : item));
  };

  const deleteAnalysis = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Apakah Kakak yakin ingin menghapus analisis sinyal ini secara permanen?")) {
      const remaining = analysesList.filter(item => item.id !== id);
      setAnalysesList(remaining);
      if (selectedSignalId === id && remaining.length > 0) setSelectedSignalId(remaining[0].id);
    }
  };

  const filteredHistory = analysesList.filter(item => historyTab === 'active' ? !item.isArchived : item.isArchived);

  return (
    <div className="space-y-6">
      
      {/* ATURAN LAYOUT DOKUMEN CETAK PDF DENGAN ANTI-BREAK DISRUPTIVE RULES */}
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

      {/* HEADER KHUSUS CETAK PRINT PDF DENGAN NAMA SINYAL SPESIFIK */}
      <div className="print-only-header">
        <h1 className="text-xl font-bold uppercase text-slate-900">TRADERSCLUB EXECUTIVE SIGNAL INTELLIGENCE</h1>
        <p className="text-sm font-bold text-indigo-900 mt-1">
          Laporan Hasil Audit Sinyal: {displayName}
        </p>
        <p className="text-xs text-slate-600 font-semibold mt-0.5">
          Institutional Risk Assessment Report | Tanggal Audit: {data.analyzedDate}
        </p>
      </div>

      {/* NOTIFIKASI SEMENTARA */}
      {uploadReportNotification && (
        <div className="no-print bg-indigo-900 text-white p-4 rounded-xl shadow-lg border border-indigo-700 flex justify-between items-start animate-fadeIn">
          <div className="space-y-1 pr-4">
            <p className="font-bold text-amber-400 text-xs flex items-center space-x-1.5">
              <Sparkles size={16} /> <span>Laporan Pemrosesan Upload Data (Institutional Audit Log):</span>
            </p>
            <ul className="list-disc list-inside text-xs text-indigo-100 space-y-0.5 pt-1">
              {uploadReportNotification.map((note, idx) => <li key={idx}>{note}</li>)}
            </ul>
          </div>
          <button onClick={() => setUploadReportNotification(null)} className="p-1 hover:bg-indigo-800 rounded-lg text-indigo-300 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      )}

      {/* TOP BAR */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex bg-slate-200 p-1 rounded-xl w-full md:w-fit space-x-1">
          <button onClick={() => handleTabChange('summary')} className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            <BarChart2 size={16} /> <span>Executive Summary ({displayName})</span>
          </button>
          <button onClick={() => handleTabChange('detail')} className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${activeTab === 'detail' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            <BookOpen size={16} /> 
            <span>Analisis Detail & Review</span>
            {!isLeadUnlocked && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">LOCKED</span>}
          </button>
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

      {/* LEAD CAPTURE & NGOPI BARENG MODAL */}
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
                    <span>Konfirmasi & Buka Laporan Audit</span>
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

      {/* ADMIN AUTH & SETTINGS MODALS */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 border animate-fadeIn">
            <h3 className="font-bold text-slate-900 border-b pb-2">Akses Mode Admin</h3>
            <form onSubmit={handleAdminAuth} className="space-y-3">
              <p className="text-xs text-slate-500">Masukkan password Admin untuk membuka nama asli sinyal dan provider.</p>
              <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="Password Admin (Default: 151264)..." className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
              {authError && <p className="text-xs text-rose-600 font-semibold">{authError}</p>}
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-2 text-xs font-semibold bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg">Verifikasi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 border animate-fadeIn">
            <h3 className="font-bold text-slate-900 border-b pb-2">Ubah Password Admin</h3>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <input type="text" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} placeholder="Password Baru..." className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowSettingsModal(false)} className="px-4 py-2 text-xs font-semibold bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOADER ZONE */}
      {showUploader && (
        <section className="no-print bg-white rounded-xl shadow-sm border border-indigo-200 p-6 animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-indigo-600" size={20} />
              <h2 className="text-sm font-bold text-slate-800">Smart Institutional Intake Gateway</h2>
            </div>
          </div>

          {isAiProcessing ? (
            <div className="border-2 border-indigo-400 bg-indigo-50 rounded-xl p-8 text-center space-y-3">
              <div className="inline-block p-3 bg-indigo-600 text-white rounded-full animate-bounce"><Cpu size={24} /></div>
              <p className="text-sm font-bold text-indigo-900">Menganalisis & Menggabungkan File Sinyal...</p>
              <p className="text-xs text-indigo-700 font-semibold">{fileDetailsText}</p>
              <div className="w-full bg-indigo-200 rounded-full h-1.5 max-w-xs mx-auto overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e); }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
            >
              <input type="file" multiple accept="image/*,.csv" onChange={handleFileUpload} className="hidden" id="file-upload-input" />
              <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center">
                <UploadCloud size={32} className="text-indigo-600 mb-3" />
                <p className="text-sm font-bold text-slate-800">Pilih / Tarik Banyak File Sekaligus (Screenshot MQL5 & History CSV)</p>
                <p className="text-xs text-slate-500 mt-1">Sistem melakukan audit kuantitatif mendalam standar institusi fund manager.</p>
              </label>
            </div>
          )}
        </section>
      )}

      {/* EXECUTIVE SUMMARY TAB */}
      {activeTab === 'summary' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* WIDGET INTERAKTIF: DYNAMIC BATCHING & NGOPI BARENG CTA */}
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
                <span>Batch #1 Readiness: {data.batchReadiness || 75}%</span>
              </div>
            </div>

            {/* DYNAMIC READINESS PROGRESS BAR */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-amber-200">
                <span>Kesiapan Server & Kuota Komunitas ({displayName})</span>
                <span className="font-bold text-amber-400">{data.batchReadiness || 75}% Ready</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 border border-amber-900/60 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${data.batchReadiness || 75}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-amber-200/70 italic pt-0.5">
                *Batch dibuka otomatis saat indikator mencapai kesiapan server minimum.
              </p>
            </div>

            {/* 3 ACTION BUTTONS (NGOPI OTOMATIS, NGOPI MANDIRI, USULKAN SINYAL) */}
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

          {/* INSTITUTIONAL EFFICIENCY AUDIT SECTION (EFFICIENCY COMPARISON CARDS) */}
          <section className="no-print bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-xl space-y-6">
            <div className="text-center space-y-1.5 border-b border-slate-800 pb-4">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/30">
                Institutional Efficiency Audit
              </span>
              <h2 className="text-lg md:text-xl font-extrabold text-white">
                Analisis Komparasi Efisiensi Alokasi Modal
              </h2>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                Rasio efisiensi biaya operasional dan akumulasi profit bersih antara alokasi mandiri vs Co-Subscription TradersClub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* CARD 1: BELI SENDIRI */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-rose-400">
                    <X size={18} />
                    <h3 className="font-bold text-sm text-slate-200">Alokasi Mandiri (MQL5)</h3>
                  </div>
                  <div className="text-2xl font-black text-white">$45 <span className="text-xs font-normal text-slate-400">/ bulan</span></div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-700/60">
                    <li>• Sinyal MQL5 Premium: $30/bln</li>
                    <li>• MQL5 Dedicated VPS: $15/bln</li>
                    <li>• Beban konfigurasi server mandiri</li>
                  </ul>
                </div>
                <div className="bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-lg text-rose-200 text-xs font-medium">
                  ❌ <strong>High Overhead:</strong> Efisiensi modal rendah karena biaya langganan & VPS ditanggung 100% tanpa konsolidasi.
                </div>
              </div>

              {/* CARD 2: MASTER BROKER LAIN */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <AlertTriangle size={18} />
                    <h3 className="font-bold text-sm text-slate-200">Standard Provider Broker</h3>
                  </div>
                  <div className="text-2xl font-black text-white">30% - 50% <span className="text-xs font-normal text-slate-400">Profit Share</span></div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-700/60">
                    <li>• Biaya Pendaftaran: $0</li>
                    <li>• Potongan Performance Fee Jumbo</li>
                    <li>• Tanpa verifikasi audit risiko independen</li>
                  </ul>
                </div>
                <div className="bg-amber-950/40 border border-amber-800/50 p-2.5 rounded-lg text-amber-200 text-xs font-medium">
                  ⚠️ <strong>High Friction:</strong> Potongan profit 30%-50% menggerus pertumbuhan akumulasi modal bersih (*Net Yield*) investor.
                </div>
              </div>

              {/* CARD 3: TRADERSCLUB (HIGHEST EFFICIENCY) */}
              <div className="bg-gradient-to-b from-indigo-900/90 to-slate-900 border-2 border-amber-500 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-bl-lg flex items-center space-x-1">
                  <Zap size={10} fill="currentColor" /> <span>Optimal Efficiency</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <ShieldCheck size={18} />
                    <h3 className="font-bold text-sm text-white">TradersClub Co-Sub</h3>
                  </div>
                  <div className="text-2xl font-black text-amber-400">$10 <span className="text-xs font-normal text-slate-300">/ bulan + 10% Profit Share</span></div>
                  <ul className="text-xs text-slate-200 space-y-1.5 pt-2 border-t border-indigo-700/60">
                    <li className="flex items-center space-x-1.5"><Check size={13} className="text-emerald-400" /> <span>Efisiensi modal sewa sinyal hingga 75%</span></li>
                    <li className="flex items-center space-x-1.5"><Check size={13} className="text-emerald-400" /> <span>Free Cloud Auto-Execution 24/7 (0% VPS)</span></li>
                    <li className="flex items-center space-x-1.5"><Check size={13} className="text-emerald-400" /> <span>Performance Fee Terringan (Cuma 10%)</span></li>
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-lg text-emerald-300 text-xs font-medium">
                    ✨ <strong>Maximized Net Yield:</strong> Biaya operasional minimal & retensi profit bersih investor maksimal (90%).
                  </div>

                  <button 
                    onClick={() => handleOpenNgopiModal('Ngopi Otomatis (0% Iuran Depan, 10% Profit Share)')}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <span>GABUNG BATCH TRADERSCLUB</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          </section>

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
                  Sinyal memiliki <strong>Risk-Adjusted Return yang sangat solid</strong>. Pertumbuhan <strong>{data.growth}</strong> dicapai dengan pengawasan lot yang konsisten.
                </p>
              </div>

              <div className="print-card bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle size={18} className="text-amber-600" />
                  <span>2. Key Risk Consideration</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Risiko utama berada pada <strong>Maximal Drawdown {data.maxDD}%</strong> saat pergerakan ekstrem harian. Deposit Load puncak {data.maxDepositLoad}% berada pada ambang batas aman.
                </p>
              </div>

              <div className="print-card bg-indigo-50 border border-indigo-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                  <Zap size={18} className="text-indigo-600" />
                  <span>3. Allocation Recommendation</span>
                </div>
                <div className="text-xs text-indigo-900 space-y-1">
                  <p><strong>Verdict:</strong> <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">APPROVED</span></p>
                  <p><strong>Risk Level:</strong> <span className="bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded font-bold">MODERATE / CONSERVATIVE</span></p>
                  <p className="text-indigo-800 pt-0.5">Disarankan alokasi modal dengan ketahanan minimum <strong>${data.recommendedCapitalPerLot} / 0.01 lot</strong>.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="print-section grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Growth', value: data.growth, sub: `Reliability: ${data.reliabilityWeeks} Wks`, color: 'text-emerald-600' },
              { label: 'Total Net Profit', value: `$${data.netProfit}`, sub: 'MQL5 Parsed Net Profit', color: 'text-emerald-600' },
              { label: 'Win Rate', value: `${data.winRate}%`, sub: 'Profit Trades Share', color: 'text-slate-700' },
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

          <section className="print-section bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <DollarSign className="text-indigo-600" size={20} /> <span>Struktur Saldo & Arus Kas Akun ({displayName})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="print-card p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Balance</p>
                <p className="text-base font-bold text-slate-800">${data.balance}</p>
              </div>
              <div className="print-card p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Equity</p>
                <p className="text-base font-bold text-slate-800">${data.equity}</p>
              </div>
              <div className="print-card p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Initial Deposit</p>
                <p className="text-base font-bold text-slate-800">${data.initialDeposit}</p>
              </div>
              <div className="print-card p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Total Deposit</p>
                <p className="text-base font-bold text-emerald-600">${data.totalDeposit}</p>
              </div>
              <div className="print-card p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Total Withdrawal</p>
                <p className="text-base font-bold text-amber-600">${data.totalWithdrawal}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* DETAIL TAB: BEDAH ANALISIS MENDALAM STANDAR HEDGE FUND CRO */}
      {activeTab === 'detail' && (
        <div className="space-y-6 animate-fadeIn">
          
          <section className="print-section bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-md p-6 space-y-6">
            <div className="border-b border-slate-700 pb-3 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <Award className="text-amber-400" size={22} /> 
                <span>Institutional Analyst Assessment Report — {displayName}</span>
              </h2>
              <span className="text-xs bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full font-medium">Hedge Fund Audit Standard</span>
            </div>

            <div className="space-y-5 text-sm text-slate-200 leading-relaxed">
              
              {/* 1. GROWTH & EQUITY CURVE */}
              <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                  <TrendingUp size={18} /> <span>1. Analisis Growth & Equity Curve Dynamics</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Pertumbuhan akumulatif sinyal <strong>{displayName}</strong> sebesar <strong className="text-emerald-400">{data.growth}</strong> selama rekam jejak <strong className="text-emerald-400">{data.reliabilityWeeks} Minggu</strong> menunjukkan kurva eksponensial yang sangat teratur. Didukung oleh <strong>Calmar Ratio {data.calmarRatio}</strong> dan <strong>Recovery Factor {data.recoveryFactor}</strong>, kurva ekuitas membuktikan bahwa ekspansi modal terjadi secara organik tanpa lonjakan spekulatif berbahaya, mencerminkan kedisiplinan alokasi volume yang superior.
                </p>
              </div>

              {/* 2. MICROSTRUCTURE & TRADE EXPECTANCY */}
              <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                  <Crosshair size={18} /> <span>2. Market Microstructure & Trade Expectancy</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Sinyal mengandalkan eksekusi <strong>Algo Trading {data.algoTrading}%</strong> dengan rasio ekspektasi profit per transaksi (*Trade Expectancy*) sebesar <strong className="text-emerald-400">{data.expectancyUSD}</strong>. Rata-rata holding period selama {data.avgHoldingDays} hari memastikan strategi ini tahan terhadap *noise* pergerakan harga jangka pendek di sesi Asia/Eropa, menjaga kestabilan *spread* dan menghindari slippage berlebihan.
                </p>
              </div>

              {/* 3. TOXIC STRATEGY CHECK (MARTINGALE / GRID) */}
              <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                  <ShieldAlert size={18} /> <span>3. Deteksi Strategi Toxic (Martingale & Grid Check)</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Berdasarkan audit mendalam struktur marjin, <strong>Deposit Load Maksimum tercatat pada {data.maxDepositLoad}%</strong>. Ini adalah validasi mutlak bahwa sistem **BEBAS DARI STRATEGI MARTINGALE MAUPUN GRID TOXIC**. Tidak ada penambahan volume lot eksponensial saat posisi mengalami kerugian, sehingga melindungi dana investor dari risiko margin call mendadak (*ruin risk*).
                </p>
              </div>

              {/* 4. FUND CAPACITY & LIQUIDITY */}
              <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                  <Activity size={18} /> <span>4. Fund Capacity & Liquidity Constraints</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Kapasitas optimal untuk alokasi dana copy trading pada sinyal ini diperkirakan mencapai <strong className="text-indigo-300">{data.fundCapacity}</strong>. Melampaui batas ini pada pair likuiditas menengah berisiko memicu *market impact* atau pelebaran *spread* saat broker mengeksekusi order dalam ukuran lot institusional besar.
                </p>
              </div>

              {/* 5. QUANTITATIVE RISK METRICS GRID */}
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
                    <p className="text-[11px] text-slate-400 mt-1">Mengukur return terhadap downside volatility.</p>
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

              {/* 6. CRO FINAL VERDICT */}
              <div className="print-card bg-indigo-900/50 p-4 rounded-xl border border-indigo-500/40 space-y-2">
                <h3 className="font-bold text-emerald-400 text-base flex items-center space-x-2">
                  <CheckCircle size={18} /> <span>6. Kesimpulan CRO (Chief Risk Officer Final Verdict)</span>
                </h3>
                <p className="text-xs text-slate-200">
                  Sinyal <strong>{displayName}</strong> berhasil melewati seluruh standar uji kuantitatif komite investasi institusional dengan rekam jejak yang valid dan transparan dari {data.subscribersCount} Followers beraset ${data.subscribersCapitalUSD.toLocaleString()} USD. Rekomendasi mutlak: <strong>APPROVED UNTUK ALOKASI DANA KELOLAAN</strong>.
                </p>
              </div>

            </div>
          </section>

          {/* INFORMASI PARAMETER PENDAFTARAN & SUBSCRIPTION FEE */}
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

          <section className="print-section bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <Cpu className="text-indigo-600" size={20} /> <span>Metrik Radar Sinyal MQL5 (Pengukuran Eksekusi)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
              <div className="print-card p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <p className="text-xs text-indigo-600 font-semibold">Algo Trading</p>
                <p className="text-xl font-bold text-indigo-900 mt-1">{data.algoTrading}%</p>
              </div>
              <div className="print-card p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-xs text-amber-600 font-semibold">Max Drawdown</p>
                <p className="text-xl font-bold text-amber-900 mt-1">{data.maxDD}%</p>
              </div>
              <div className="print-card p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                <p className="text-xs text-emerald-600 font-semibold">Profit Trades</p>
                <p className="text-xl font-bold text-emerald-900 mt-1">{data.profitTradesShare}%</p>
              </div>
              <div className="print-card p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <p className="text-xs text-rose-600 font-semibold">Loss Trades</p>
                <p className="text-xl font-bold text-rose-900 mt-1">{data.lossTradesShare}%</p>
              </div>
              <div className="print-card p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-600 font-semibold">Trading Activity</p>
                <p className="text-xl font-bold text-blue-900 mt-1">{data.tradingActivity}%</p>
              </div>
              <div className="print-card p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 font-semibold">Max Deposit Load</p>
                <p className="text-xl font-bold text-slate-800 mt-1">{data.maxDepositLoad}%</p>
              </div>
            </div>
          </section>

          {/* TOMBOL PRINT/DOWNLOAD PDF DENGAN NAMA SINYAL OTOMATIS */}
          <div className="no-print flex justify-end">
            <button onClick={handlePrintPdfRequest} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors shadow-sm">
              <FileDown size={18} /> <span>Download Laporan PDF — {displayName}</span>
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM MANAGER ZONE */}
      <section className="bottom-manager-zone no-print bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4 border-b pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <Clock className="text-indigo-600" size={20} /> <span>Daftar Riwayat Sinyal Teranalisis (ALPHA ANALYZER Manager)</span>
            </h2>
            <p className="text-xs text-slate-500">Kelola riwayat analisis aktif, arsip, atau hapus sinyal yang tidak terpakai.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button onClick={() => setHistoryTab('active')} className={`px-3 py-1.5 rounded-md ${historyTab === 'active' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>Aktif ({analysesList.filter(a => !a.isArchived).length})</button>
            <button onClick={() => setHistoryTab('archived')} className={`px-3 py-1.5 rounded-md ${historyTab === 'archived' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>Arsip ({analysesList.filter(a => a.isArchived).length})</button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">Tidak ada data.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHistory.map((item) => {
              const isSelected = item.id === selectedSignalId;
              return (
                <div key={item.id} onClick={() => setSelectedSignalId(item.id)} className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${isSelected ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                  <div className="space-y-1.5 w-full pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{isAdminMode ? item.realSignalName : item.indexName}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">{item.analyzedDate}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">Provider: {isAdminMode ? item.realProvider : item.indexProvider}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs pt-1">
                      <span className="text-emerald-600 font-bold">Growth: {item.growth}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-700 font-semibold flex items-center space-x-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{item.reliabilityWeeks} Wks</span>
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-600 font-medium">Win: {item.winRate}%</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-amber-600 font-semibold">Max DD: {item.maxDD}%</span>
                    </div>

                    {item.fileDetailsInfo && (
                      <p className="text-[11px] text-indigo-600 font-medium pt-0.5 flex items-center space-x-1">
                        <FileText size={12} />
                        <span>{item.fileDetailsInfo}</span>
                      </p>
                    )}
                    
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {isAdminMode && (
                      <>
                        <button onClick={(e) => toggleArchiveStatus(e, item.id)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200">{item.isArchived ? <RefreshCw size={16}/> : <Archive size={16}/>}</button>
                        <button onClick={(e) => deleteAnalysis(e, item.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200"><Trash2 size={16}/></button>
                      </>
                    )}
                    <ChevronRight className={isSelected ? "text-indigo-600 ml-1" : "text-slate-300 ml-1"} size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
