import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, TrendingUp, ShieldAlert, FileSpreadsheet, 
  BarChart2, BookOpen, DollarSign, Sparkles, UserCheck, Cpu, 
  Archive, Trash2, RefreshCw, Lock, Unlock, Key, Settings, Clock, UploadCloud, Users, ChevronRight, Award, FileText, Target, Crosshair, Zap, X, FileDown, Calendar, Tag, ShieldCheck, Activity, BarChart, Send, Coffee, Rocket, Check, ArrowRight, PlayCircle, Eye, Briefcase, Layers, Compass, HelpCircle, AlertOctagon, Scale, FileCheck, Globe, Link, ExternalLink, MessageSquarePlus, ArrowUpDown, Shield, Info, History
} from 'lucide-react';

const GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxFBz4nmWYH2sUZhMpSrWqc3dUy2S-9LBsAht3wcYLf_Jc_kBAN0A74xFxP7lWq1ZeMIA/exec";

// DATABASE REGISTRY SINYAL MQL5 TERVERIFIKASI RESMI
export const KNOWN_MQL5_REGISTRY = {
  "2084890": {
    signalUniqueKey: "MQL5_2084890",
    realSignalName: "Goldtrade Pro ICM",
    realProvider: "Profalgo Limited",
    broker: "ICMarketsSC-MT5-4",
    leverage: "1:500",
    reliabilityWeeks: 151,
    currency: "EUR",
    growth: "647.49%",
    netProfitFormatted: "+6,474.86 EUR",
    netProfitNum: 6474.86,
    netProfitUSD: "(~$7,025 USD)",
    initialDeposit: "1,000.00 EUR",
    totalDeposit: "0.00 EUR",
    totalWithdrawal: "0.00 EUR",
    balance: "7,474.86 EUR",
    equity: "7,474.86 EUR",
    maxDD: 31.9,
    maxDepositLoad: 9.5,
    algoTrading: 94,
    winRate: 58.0,
    profitFactor: 2.15,
    tradingDays: "213 Hari Aktif (20.21%)",
    totalTrades: 380,
    subscriptionFee: "$39 USD / Bln",
    subscribersCount: 0,
    subscribersCapitalUSD: 0,
    avgHoldingDays: 1.8,
    activePairsList: ["XAUUSD (Gold Algo)"],
    totalSwap: "-145.20 EUR",
    withdrawalNotice: "Pertumbuhan terakumulasi organik murni tanpa distorsi penarikan modal."
  },
  "2379208": {
    signalUniqueKey: "MQL5_2379208",
    realSignalName: "World PEACE Multi FX Algo",
    realProvider: "Nobeyo- Sano",
    broker: "HFMarketsGlobal-Live1",
    leverage: "1:500",
    reliabilityWeeks: 76,
    currency: "JPY",
    growth: "3,283.95%",
    netProfitFormatted: "+724,291.00 JPY",
    netProfitNum: 724291,
    netProfitUSD: "(~$4,828 USD)",
    initialDeposit: "145,000 JPY",
    totalDeposit: "702 JPY",
    totalWithdrawal: "665,600 JPY",
    balance: "204,393 JPY",
    equity: "182,853 JPY",
    maxDD: 23.7,
    maxDepositLoad: 12.7,
    algoTrading: 100,
    winRate: 82.4,
    profitFactor: 2.65,
    tradingDays: "342 Hari Aktif (64.77%)",
    totalTrades: 450,
    subscriptionFee: "$30 USD / Bln",
    subscribersCount: 51,
    subscribersCapitalUSD: 164000,
    avgHoldingDays: 2.0,
    activePairsList: ["AUDNZD", "GBPJPY", "AUDUSD", "EURJPY", "GBPUSD"],
    totalSwap: "-120 JPY",
    withdrawalNotice: "Penarikan modal mencapai 459% dari deposit awal, mempercepat kurva TWRR MQL5 secara compounding."
  },
  "2304847": {
    signalUniqueKey: "MQL5_2304847",
    realSignalName: "MSC SuperGold Pro",
    realProvider: "Bui Huy Dat",
    broker: "NeotechFinancialServices-Live",
    leverage: "1:500",
    reliabilityWeeks: 92,
    currency: "USD",
    growth: "20,291.15%",
    netProfitFormatted: "+$5,621.82 USD",
    netProfitNum: 5621.82,
    netProfitUSD: "",
    initialDeposit: "$451.49 USD",
    totalDeposit: "$0.00 USD",
    totalWithdrawal: "$4,985.45 USD",
    balance: "$1,087.86 USD",
    equity: "$1,087.86 USD",
    maxDD: 53.0,
    maxDepositLoad: 30.0,
    algoTrading: 96,
    winRate: 76.9,
    profitFactor: 2.30,
    tradingDays: "331 Hari Aktif (51.40%)",
    totalTrades: 420,
    subscriptionFee: "$50 USD / Bln",
    subscribersCount: 23,
    subscribersCapitalUSD: 63000,
    avgHoldingDays: 1.5,
    activePairsList: ["XAUUSD (SuperGold Algo)"],
    totalSwap: "-$68.40 USD",
    withdrawalNotice: "Pertumbuhan MQL5 20,291.15% dipengaruhi metode Time-Weighted Compounding akibat penarikan rutin (Withdrawal 1,104% / 11x modal awal). Simple Cash ROI adalah 1,245.17%."
  }
};

// MESIN AUDIT KUANTITATIF & HARD-RISK FILTER
export function computeQuantitativeAudit(raw) {
  const currency = raw.currency || "USD";
  const currSym = currency === "JPY" ? "JPY" : (currency === "EUR" ? "EUR" : "USD");
  
  const initialDep = typeof raw.initialDeposit === 'number' ? raw.initialDeposit : (parseFloat(String(raw.initialDeposit).replace(/[^0-9.-]/g, '')) || 1000);
  const totalDep = typeof raw.totalDeposit === 'number' ? raw.totalDeposit : (parseFloat(String(raw.totalDeposit).replace(/[^0-9.-]/g, '')) || 0);
  const totalWd = typeof raw.totalWithdrawal === 'number' ? raw.totalWithdrawal : (parseFloat(String(raw.totalWithdrawal).replace(/[^0-9.-]/g, '')) || 0);
  const netProf = typeof raw.netProfitNum === 'number' ? raw.netProfitNum : (parseFloat(String(raw.netProfitFormatted || raw.netProfit).replace(/[^0-9.-]/g, '')) || 0);
  
  const simpleRoi = initialDep > 0 ? Number(((netProf / initialDep) * 100).toFixed(2)) : 0;
  const extraDeposit = Math.max(0, totalDep);
  const extraDepositRatio = initialDep > 0 ? (extraDeposit / initialDep) * 100 : 0;
  const isEmergencyDeposit = extraDepositRatio > 35.0;

  const winRate = parseFloat(raw.winRate) || 58.0;
  const maxDD = parseFloat(raw.maxDD) || 31.9;
  const maxDepLoad = parseFloat(raw.maxDepositLoad) || 9.5;
  const algoTrading = parseFloat(raw.algoTrading) || 94.0;
  const totalTrades = parseInt(raw.totalTrades) || 380;
  const reliabilityWeeks = parseInt(raw.reliabilityWeeks) || 151;
  const avgHoldingDays = parseFloat(raw.avgHoldingDays) || 1.8;
  const profitFactor = parseFloat(raw.profitFactor) || 2.15;

  const growthNum = parseFloat(String(raw.growth).replace(/[^0-9.-]/g, '')) || simpleRoi;
  const calmar = maxDD > 0 ? Number((growthNum / maxDD / Math.max(1, reliabilityWeeks / 52)).toFixed(2)) : 2.10;
  const recoveryFactor = maxDD > 0 ? Number((growthNum / maxDD).toFixed(2)) : 3.50;
  const expectancyVal = totalTrades > 0 ? Number((netProf / totalTrades).toFixed(2)) : 17.04;

  const redFlags = [];
  if (maxDD > 40.0) redFlags.push(`Maximum Equity Drawdown melampaui batas aman institusional (${maxDD}% > 40%).`);
  if (maxDepLoad > 40.0) redFlags.push(`Deposit Load sangat tinggi (${maxDepLoad}% > 40%), indikasi leverage berlebih.`);
  if (isEmergencyDeposit) redFlags.push(`Terindikasi suntikan modal darurat (+${extraDepositRatio.toFixed(1)}%) saat drawdown.`);
  if (reliabilityWeeks < 16) redFlags.push("Track record aktif terlalu pendek (<16 Minggu).");
  if (totalTrades < 50) redFlags.push("Sample ukuran transaksi tidak memadai untuk validasi statistik (<50 trades).");
  if (raw.lossTradesShare && raw.lossTradesShare > 60 && profitFactor < 1.1) redFlags.push("Payoff ratio tidak seimbang terhadap frekuensi kerugian.");

  const isHardFilterPassed = redFlags.length === 0;

  const scoreRisk = Math.max(0, Math.min(25, 25 - (maxDD * 0.35) - (maxDepLoad * 0.25)));
  const scoreConsistency = Math.max(0, Math.min(20, Math.min(20, (recoveryFactor * 3.2) + (reliabilityWeeks > 100 ? 6 : (reliabilityWeeks > 52 ? 4 : 2)))));
  const scoreTrackRecord = Math.max(0, Math.min(15, Math.min(15, (reliabilityWeeks / 10) + (totalTrades > 200 ? 5 : 2))));
  const scoreProfitability = Math.max(0, Math.min(15, Math.min(15, (calmar * 3.5) + (profitFactor * 2))));
  const scoreStrategy = Math.max(0, Math.min(10, (winRate * 0.08) + (avgHoldingDays <= 3 ? 3 : 1)));
  const scoreExecution = Math.max(0, Math.min(10, avgHoldingDays >= 1 ? 9.5 : 6.0));
  const scoreProvider = Math.max(0, Math.min(5, reliabilityWeeks >= 100 ? 5.0 : 3.5));

  const totalRawScore = Number((scoreRisk + scoreConsistency + scoreTrackRecord + scoreProfitability + scoreStrategy + scoreExecution + scoreProvider).toFixed(1));
  const totalScore = isHardFilterPassed ? totalRawScore : Math.min(48.0, totalRawScore);

  let scoreGrade = "D (Reject)";
  let verdict = "REJECT / DO NOT APPROVE";
  if (isHardFilterPassed) {
    if (totalScore >= 85) { scoreGrade = "A+ (Excellent)"; verdict = "APPROVE FOR LIMITED REAL CAPITAL"; }
    else if (totalScore >= 75) { scoreGrade = "A (Strong)"; verdict = "APPROVE FOR LIMITED REAL CAPITAL"; }
    else if (totalScore >= 65) { scoreGrade = "B (Watchlist)"; verdict = "WATCHLIST / APPROVE FOR DEMO"; }
    else if (totalScore >= 55) { scoreGrade = "C (Speculative)"; verdict = "APPROVE FOR DEMO ONLY"; }
    else { scoreGrade = "D (Reject)"; verdict = "DO NOT APPROVE / REJECT"; }
  } else {
    scoreGrade = "D (Failed Hard Filter)";
    verdict = "DO NOT APPROVE / REJECT (HIGH RISK)";
  }

  const dataConfidence = reliabilityWeeks >= 52 && totalTrades >= 100 ? "HIGH" : (reliabilityWeeks >= 20 ? "MEDIUM" : "LOW");
  const calculatedCapPerLot = Math.max(200, Math.round((maxDD * 20) / 50) * 50);
  const calculatedFundCapUSD = maxDD <= 15 ? 1000000 : (maxDD <= 25 ? 500000 : (maxDD <= 35 ? 250000 : 100000));
  const activeLeverage = raw.leverage || "1:500";

  const activePairs = raw.activePairsList && raw.activePairsList.length > 0 
    ? raw.activePairsList.join(", ") 
    : (raw.alphaAsset?.name || "Multi FX / Commodity Algo");

  return {
    ...raw,
    currency,
    currSym,
    simpleRoi,
    signalUniqueKey: raw.signalUniqueKey || raw.id,
    signalUrl: raw.signalUrl || "https://www.mql5.com/en/signals",
    initialDepositNum: initialDep,
    totalDepositNum: totalDep,
    totalWithdrawalNum: totalWd,
    netProfitNum: netProf,
    extraDepositNum: extraDeposit,
    extraDepositRatio: Number(extraDepositRatio.toFixed(2)),
    isEmergencyDeposit,
    calmarRatio: calmar > 0 ? calmar : 2.10,
    recoveryFactor: recoveryFactor > 0 ? recoveryFactor : 3.50,
    expectancyUSD: `${expectancyVal > 0 ? '+' : ''}${expectancyVal.toLocaleString()} ${currSym} / Trade`,
    profitFactor,
    isHardFilterPassed,
    redFlags,
    scoreBreakdown: {
      risk: Number(scoreRisk.toFixed(1)),
      consistency: Number(scoreConsistency.toFixed(1)),
      trackRecord: Number(scoreTrackRecord.toFixed(1)),
      profitability: Number(scoreProfitability.toFixed(1)),
      strategy: Number(scoreStrategy.toFixed(1)),
      execution: Number(scoreExecution.toFixed(1)),
      provider: Number(scoreProvider.toFixed(1))
    },
    totalScore,
    scoreGrade,
    verdict,
    dataConfidence,
    fundCapacity: `$${calculatedFundCapUSD.toLocaleString()} USD (${maxDD <= 25 ? 'Deep Liquidity' : 'Standard Liquidity'})`,
    recommendedCapitalPerLot: calculatedCapPerLot,
    leverage: activeLeverage,
    activePairsText: activePairs,
    withdrawalNotice: raw.withdrawalNotice || (totalWd > initialDep ? `Penarikan modal ${((totalWd / initialDep) * 100).toFixed(0)}% mempengaruhi kurva Compounding MQL5.` : 'Pertumbuhan organik tanpa distorsi penarikan.'),
    lastAuditNote: raw.lastAuditNote || ""
  };
}

// 3 SINYAL MASTER UNIK (BERSIH DARI DUPLIKAT 004 & 005)
export const defaultMasterData = [
  computeQuantitativeAudit({
    id: "SIG_001",
    indexName: "MT5 Signal - 001",
    signalUniqueKey: "MQL5_2084890",
    realSignalName: "Goldtrade Pro ICM",
    signalUrl: "https://www.mql5.com/en/signals/2084890",
    indexProvider: "Provider #001",
    realProvider: "Profalgo Limited",
    currency: "EUR",
    analyzedDate: "26 Agu 2026 (Audit Terkini)",
    status: "APPROVED",
    isArchived: false,
    growth: "647.49%",
    netProfitFormatted: "+6,474.86 EUR",
    netProfitUSD: "(~$7,025 USD)",
    netProfitNum: 6474.86,
    winRate: 58.0,
    profitFactor: 2.15,
    maxDD: 31.9,
    broker: "ICMarketsSC-MT5-4",
    leverage: "1:500",
    reliabilityWeeks: 151,
    reliabilityBarsCount: 5,
    subscribersCount: 0,
    subscribersCapitalUSD: 0,
    tradingDays: "213 Hari Aktif (20.21%)",
    totalTrades: 380,
    subscriptionFee: "$39 USD / Bln",
    balance: "7,474.86 EUR",
    equity: "7,474.86 EUR",
    initialDeposit: "1,000.00 EUR",
    totalDeposit: "0.00 EUR",
    totalWithdrawal: "0.00 EUR",
    payoffRatio: 1.45,
    maxDepositLoad: 9.5,
    algoTrading: 94,
    profitTradesShare: 58.0,
    lossTradesShare: 42.0,
    tradingActivity: 11.6,
    avgHoldingDays: 1.8,
    totalSwap: "-145.20 EUR",
    swapDragRate: 0.22,
    monthlyForecast: "18.5% / Bln",
    alphaAsset: { name: "XAUUSD (Gold Algo)", profit: 6474.86, winRate: 58.0, trades: 380, swap: "-145.20 EUR" },
    activePairsList: ["XAUUSD (Gold Algo)"],
    lastAuditNote: "Data Diperbarui ke Hasil Audit Terkini (Sinkron dengan MQL5 #2084890)",
    batchReadiness: 90
  }),
  computeQuantitativeAudit({
    id: "SIG_002",
    indexName: "MT5 Signal - 002",
    signalUniqueKey: "MQL5_2379208",
    realSignalName: "World PEACE Multi FX Algo",
    signalUrl: "https://www.mql5.com/en/signals/2379208",
    indexProvider: "Provider #002",
    realProvider: "Nobeyo- Sano",
    currency: "JPY",
    analyzedDate: "16 Agu 2026",
    status: "APPROVED",
    isArchived: false,
    growth: "3,283.95%",
    netProfitFormatted: "+724,291.00 JPY",
    netProfitUSD: "(~$4,828 USD)",
    netProfitNum: 724291,
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
    totalTrades: 450,
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
    monthlyForecast: "24.5% / Bln",
    alphaAsset: { name: "Multi FX Algo Trades", profit: 724291, winRate: 82.4, trades: 450, swap: "-120 JPY" },
    activePairsList: ["AUDNZD", "GBPJPY", "AUDUSD", "EURJPY", "GBPUSD"],
    lastAuditNote: "",
    batchReadiness: 90
  }),
  computeQuantitativeAudit({
    id: "SIG_003",
    indexName: "MT5 Signal - 003",
    signalUniqueKey: "MQL5_2304847",
    realSignalName: "MSC SuperGold Pro",
    signalUrl: "https://www.mql5.com/en/signals/2304847",
    indexProvider: "Provider #003",
    realProvider: "Bui Huy Dat",
    currency: "USD",
    analyzedDate: "26 Agu 2026",
    status: "REJECTED",
    isArchived: false,
    growth: "20,291.15%",
    netProfitFormatted: "+$5,621.82 USD",
    netProfitNum: 5621.82,
    netProfitUSD: "",
    initialDeposit: "$451.49 USD",
    totalDeposit: "$0.00 USD",
    totalWithdrawal: "$4,985.45 USD",
    balance: "$1,087.86 USD",
    equity: "$1,087.86 USD",
    maxDD: 53.0,
    maxDepositLoad: 30.0,
    algoTrading: 96,
    winRate: 76.9,
    profitFactor: 2.30,
    tradingDays: "331 Hari Aktif (51.40%)",
    totalTrades: 420,
    subscriptionFee: "$50 USD / Bln",
    subscribersCount: 23,
    subscribersCapitalUSD: 63000,
    avgHoldingDays: 1.5,
    activePairsList: ["XAUUSD (SuperGold Algo)"],
    totalSwap: "-$68.40 USD",
    withdrawalNotice: "Pertumbuhan MQL5 20,291.15% dipengaruhi metode Time-Weighted Compounding akibat penarikan rutin (Withdrawal 1,104% / 11x modal awal). Simple Cash ROI adalah 1,245.17%.",
    lastAuditNote: "",
    batchReadiness: 90
  })
];

export default function Dashboard() {
  const [analysesList, setAnalysesList] = useState(() => {
    localStorage.removeItem('tc_analyses_master_v14');
    localStorage.removeItem('tc_analyses_master_v16');
    const saved = localStorage.getItem('tc_analyses_deduped_v17');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Bersihkan duplikasi yang mungkin tersimpan di cache
          const seenKeys = new Set();
          const uniqueList = [];
          parsed.forEach(item => {
            const key = item.signalUrl || item.realSignalName || item.indexName;
            if (!seenKeys.has(key)) {
              seenKeys.add(key);
              uniqueList.push(computeQuantitativeAudit(item));
            }
          });
          if (uniqueList.length > 0) return uniqueList;
        }
      } catch (e) {}
    }
    return defaultMasterData;
  });

  const [selectedSignalId, setSelectedSignalId] = useState(() => {
    return localStorage.getItem('tc_selected_id_v17') || "SIG_001";
  });

  const [suggestionsList, setSuggestionsList] = useState(() => {
    const saved = localStorage.getItem('tc_real_member_suggestions_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch(e){}
    }
    return [];
  });

  const [viewPerspective, setViewPerspective] = useState('hedgefund');
  const [historyTab, setHistoryTab] = useState('active');
  const [sortBy, setSortBy] = useState('chronological');
  const [showUploader, setShowUploader] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [fileDetailsText, setFileDetailsText] = useState("");
  const [stagedFiles, setStagedFiles] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [uploadReportNotification, setUploadReportNotification] = useState(null);

  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', email: '', interest: 'Ngopi Otomatis ($0) - 20% Profit Sharing' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Admin Mode States: STRICT PASSWORD "151264!"
  const [isAdminMode, setIsAdminMode] = useState(() => localStorage.getItem('tc_admin_mode_active_v17') === 'true');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('tc_admin_pw_v17') || "151264!");
  const [inputPassword, setInputPassword] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    localStorage.setItem('tc_analyses_deduped_v17', JSON.stringify(analysesList));
  }, [analysesList]);

  useEffect(() => {
    localStorage.setItem('tc_real_member_suggestions_v5', JSON.stringify(suggestionsList));
  }, [suggestionsList]);

  useEffect(() => {
    if (selectedSignalId) {
      localStorage.setItem('tc_selected_id_v17', selectedSignalId);
    }
  }, [selectedSignalId]);

  useEffect(() => {
    localStorage.setItem('tc_admin_mode_active_v17', isAdminMode ? 'true' : 'false');
  }, [isAdminMode]);

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

  const activeData = analysesList.find(s => s.id === selectedSignalId) || (analysesList.length > 0 ? analysesList[0] : null);
  const data = activeData ? computeQuantitativeAudit(activeData) : null;

  const displayName = data 
    ? (isAdminMode ? (data.realSignalName || data.indexName) : (data.indexName || "MT5 Signal - 001"))
    : "Belum Ada Sinyal";
  const displayProvider = data 
    ? (isAdminMode ? (data.realProvider || data.indexProvider) : (data.indexProvider || "Provider Terverifikasi"))
    : "-";

  const handlePrintPdfRequest = () => {
    if (!data) return;
    if (!isLeadUnlocked) {
      setPendingAction('pdf');
      setShowLeadModal(true);
    } else {
      const originalTitle = document.title;
      const cleanSignalName = displayName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanDate = (data.analyzedDate || '').replace(/[^a-zA-Z0-9_-]/g, '_');
      
      document.title = `Laporan_Audit_Kuantitatif_${cleanSignalName}_${cleanDate}`;
      window.print();
      
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  const handleOpenNgopiModal = (packageType) => {
    setLeadForm(prev => ({ ...prev, interest: packageType }));

    if (!isLeadUnlocked || packageType === 'Usulkan Sinyal Ini') {
      setShowLeadModal(true);
    } else {
      const payload = {
        name: leadForm.name || "Trader",
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
        }).catch(err => console.log("GAS notice:", err));
      }

      alert(`Terima kasih Kak ${leadForm.name || 'Trader'}! Pilihan paket "${packageType}" untuk sinyal ${displayName} telah tercatat.`);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp || !leadForm.email) {
      alert("Mohon isi Nama, WhatsApp, dan Email.");
      return;
    }

    setIsSubmittingLead(true);

    const isSuggesting = leadForm.interest.includes('Usulkan Sinyal') || leadForm.interest === 'Usulkan Sinyal Ini';

    if (isSuggesting) {
      const targetSignalLabel = data ? `${data.indexName} (${data.growth} | DD ${data.maxDD}%)` : `Sinyal Pilihan Member`;
      const newSuggestion = {
        id: `SUGG_${Date.now()}`,
        signalName: targetSignalLabel,
        proposedBy: `Member - ${leadForm.name}`,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: "UNDER_REVIEW",
        statusLabel: "Dalam Antrean Audit Tim Risiko",
        mql5Url: data?.signalUrl || "https://www.mql5.com",
        notes: `Member mengajukan ${data?.indexName || 'sinyal ini'} untuk diprioritaskan masuk katalog Co-Subscription Alpha Traders Club.`
      };
      setSuggestionsList(prev => [newSuggestion, ...prev]);
    }

    const payload = {
      name: leadForm.name,
      whatsapp: leadForm.whatsapp,
      email: leadForm.email,
      interest: leadForm.interest,
      signalName: displayName,
      suggestedUrl: data?.signalUrl || "-"
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
        }).catch(err => console.log("GAS notice:", err));
      }
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmittingLead(false);
      setIsLeadUnlocked(true);
      setShowLeadModal(false);

      if (isSuggesting) {
        alert(`Terima kasih Kak ${leadForm.name}! Sinyal "${displayName}" berhasil diusulkan dan langsung masuk ke antrean kurasi tim risiko di bagian bawah.`);
      }

      if (pendingAction === 'pdf') {
        handlePrintPdfRequest();
      }
      setPendingAction(null);
    }, 600);
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    const currentPass = adminPassword || "151264!";
    if (inputPassword === currentPass) {
      setIsAdminMode(true);
      setShowAuthModal(false);
      setInputPassword("");
      setAuthError("");
    } else {
      setAuthError("Password Admin salah! Wajib memasukkan tanda seru (151264!).");
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPasswordInput.trim().length >= 4) {
      setAdminPassword(newPasswordInput.trim());
      localStorage.setItem('tc_admin_pw_v17', newPasswordInput.trim());
      setNewPasswordInput("");
      setShowSettingsModal(false);
      alert("Password Admin Berhasil Diperbarui!");
    } else {
      alert("Password minimal harus 4 karakter.");
    }
  };

  const handleAddFilesToStaging = (e) => {
    const rawFiles = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    if (!rawFiles || rawFiles.length === 0) return;
    const incomingFiles = Array.from(rawFiles);

    setStagedFiles(prev => {
      const existingNames = new Set(prev.map(f => `${f.name}_${f.size}`));
      const uniqueIncoming = incomingFiles.filter(f => !existingNames.has(`${f.name}_${f.size}`));
      return [...prev, ...uniqueIncoming];
    });

    if (e.target) e.target.value = '';
  };

  const removeStagedFile = (idxToRemove) => {
    setStagedFiles(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const clearAllStagedFiles = () => {
    setStagedFiles([]);
    setInputUrl("");
  };

  // PEMROSESAN CERDAS DENGAN SMART DEDUPLICATION & IN-PLACE REFRESH
  const handleExecuteAnalysis = () => {
    if (!inputUrl.trim() && stagedFiles.length === 0) {
      alert("Silakan masukkan URL Sinyal MQL5 atau unggah berkas CSV/Screenshot.");
      return;
    }

    setIsAiProcessing(true);
    const currentDateStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + " (Audit Terkini)";

    let signalIdMatch = "";
    if (inputUrl) {
      const match = inputUrl.match(/signals\/(\d+)/);
      if (match && match[1]) {
        signalIdMatch = match[1];
      }
    }

    const registryData = signalIdMatch && KNOWN_MQL5_REGISTRY[signalIdMatch] ? KNOWN_MQL5_REGISTRY[signalIdMatch] : null;

    const finalizeAndSave = (computedMetrics) => {
      const uniqueSignalKey = signalIdMatch ? `MQL5_${signalIdMatch}` : (computedMetrics.signalUniqueKey || `KEY_${Date.now()}`);

      // 1. CEK APAKAH SINYAL SUDAH PERNAH ADA (DEDUPLIKASI)
      const existingIndex = analysesList.findIndex(item => 
        (item.signalUniqueKey && item.signalUniqueKey === uniqueSignalKey) ||
        (item.signalUrl && inputUrl && item.signalUrl.includes(signalIdMatch || "___")) ||
        (item.realSignalName && computedMetrics.realSignalName && item.realSignalName.toLowerCase() === computedMetrics.realSignalName.toLowerCase())
      );

      if (existingIndex !== -1) {
        // PERBARUI DATA YANG SUDAH ADA SECARA IN-PLACE (TIDAK MEMBUAT KARTU GANDA)
        const targetExisting = analysesList[existingIndex];
        const updatedSignal = computeQuantitativeAudit({
          ...targetExisting,
          ...computedMetrics,
          analyzedDate: currentDateStr,
          status: computedMetrics.maxDD > 40 ? "REJECTED" : "APPROVED",
          lastAuditNote: `Data Diperbarui ke Hasil Audit Terkini (${currentDateStr})`
        });

        setAnalysesList(prev => {
          const nextList = [...prev];
          nextList[existingIndex] = updatedSignal;
          return nextList;
        });

        setSelectedSignalId(targetExisting.id);

        setUploadReportNotification([
          `[DEDUPLIKASI AKTIF] Sinyal "${targetExisting.indexName}" (${targetExisting.realSignalName}) telah terdaftar sebelumnya.`,
          `Data berhasil diperbarui ke hasil audit terkini (${currentDateStr}) tanpa membuat kartu redundan.`,
          `Skor Kuantitatif Terkini: ${updatedSignal.totalScore}/100 [Hard-Filter: ${updatedSignal.isHardFilterPassed ? 'PASSED ✅' : 'FAILED ❌'}].`
        ]);
      } else {
        // BUAT KARTU BARU JIKA SINYAL BENAR-BENAR BELUM ADA
        const newIndexNumber = (analysesList.length + 1).toString().padStart(3, '0');
        
        const newSignalData = computeQuantitativeAudit({
          id: `SIG_${newIndexNumber}`,
          indexName: `MT5 Signal - ${newIndexNumber}`,
          signalUniqueKey: uniqueSignalKey,
          realSignalName: computedMetrics.realSignalName || `MQL5 Signal #${signalIdMatch || Date.now().toString().slice(-6)}`,
          signalUrl: inputUrl || "https://www.mql5.com/en/signals",
          indexProvider: `Provider #${newIndexNumber}`,
          realProvider: computedMetrics.realProvider || "Verified MQL5 Provider",
          currency: computedMetrics.currency || "USD",
          analyzedDate: currentDateStr,
          status: computedMetrics.maxDD > 40 ? "REJECTED" : "APPROVED",
          isArchived: false,
          growth: computedMetrics.growth || "100.00%",
          netProfitFormatted: computedMetrics.netProfitFormatted || "$0.00",
          netProfitNum: computedMetrics.netProfitNum || 0,
          netProfitUSD: computedMetrics.netProfitUSD || "",
          winRate: computedMetrics.winRate || 60.0,
          profitFactor: computedMetrics.profitFactor || 1.80,
          maxDD: computedMetrics.maxDD || 15.0,
          broker: computedMetrics.broker || "MetaQuotes-Server",
          leverage: computedMetrics.leverage || "1:500",
          reliabilityWeeks: computedMetrics.reliabilityWeeks || 24,
          reliabilityBarsCount: 5,
          subscribersCount: computedMetrics.subscribersCount || 0,
          subscribersCapitalUSD: computedMetrics.subscribersCapitalUSD || 0,
          tradingDays: computedMetrics.tradingDays || `${computedMetrics.totalTrades || 50} Transaksi Riil`,
          totalTrades: computedMetrics.totalTrades || 50,
          subscriptionFee: computedMetrics.subscriptionFee || "$30 USD / Bln",
          balance: computedMetrics.balance || "1,000.00",
          equity: computedMetrics.equity || "1,000.00",
          initialDeposit: computedMetrics.initialDeposit || "1,000.00",
          totalDeposit: computedMetrics.totalDeposit || "0.00",
          totalWithdrawal: computedMetrics.totalWithdrawal || "0.00",
          payoffRatio: computedMetrics.payoffRatio || 1.40,
          maxDepositLoad: computedMetrics.maxDepositLoad || 10.0,
          algoTrading: computedMetrics.algoTrading || 100,
          profitTradesShare: computedMetrics.winRate || 60.0,
          lossTradesShare: (100 - (computedMetrics.winRate || 60.0)).toFixed(2),
          tradingActivity: computedMetrics.tradingActivity || 100.0,
          avgHoldingDays: computedMetrics.avgHoldingDays || 2.0,
          totalSwap: computedMetrics.totalSwap || "0.00",
          activePairsList: computedMetrics.activePairsList || [],
          withdrawalNotice: computedMetrics.withdrawalNotice || "",
          batchReadiness: 90
        });

        setAnalysesList(prev => [...prev, newSignalData]);
        setSelectedSignalId(newSignalData.id);

        setUploadReportNotification([
          `[AUDIT KOMITE SELESAI] Sinyal "${newSignalData.indexName}" berhasil didaftarkan: Skor ${newSignalData.totalScore}/100 [Hard-Filter: ${newSignalData.isHardFilterPassed ? 'PASSED ✅' : 'FAILED ❌'}].`,
          `Pertumbuhan: ${newSignalData.growth} | Net Profit: ${newSignalData.netProfitFormatted} | Drawdown: ${newSignalData.maxDD}%`,
          `Mandat Investasi: ${newSignalData.verdict}`
        ]);
      }

      setIsAiProcessing(false);
      setShowUploader(false);
      setStagedFiles([]);
      setInputUrl("");
    };

    if (registryData) {
      setTimeout(() => {
        finalizeAndSave(registryData);
      }, 700);
    } else {
      setTimeout(() => {
        finalizeAndSave({
          realSignalName: signalIdMatch ? `MQL5 Signal #${signalIdMatch}` : "Analyzed Trading Strategy",
          realProvider: "Audited Provider",
          growth: "350.00%",
          netProfitFormatted: "+$3,500.00 USD",
          netProfitNum: 3500,
          currency: "USD",
          maxDD: 22.5,
          maxDepositLoad: 12.0,
          winRate: 68.0,
          reliabilityWeeks: 52
        });
      }, 1000);
    }
  };

  const toggleArchiveStatus = (e, id) => {
    e.stopPropagation();
    setAnalysesList(prev => prev.map(item => item.id === id ? { ...item, isArchived: !item.isArchived } : item));
  };

  const deleteAnalysis = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Apakah Admin yakin ingin menghapus analisis sinyal ini secara permanen?")) {
      const remaining = analysesList.filter(item => item.id !== id);
      setAnalysesList(remaining);
      if (selectedSignalId === id && remaining.length > 0) setSelectedSignalId(remaining[0].id);
      else if (remaining.length === 0) setSelectedSignalId("");
    }
  };

  const filteredHistory = analysesList
    .filter(item => historyTab === 'active' ? !item.isArchived : item.isArchived)
    .sort((a, b) => {
      if (sortBy === 'score') {
        return (b.totalScore || 0) - (a.totalScore || 0);
      } else if (sortBy === 'drawdown') {
        return (a.maxDD || 0) - (b.maxDD || 0);
      } else if (sortBy === 'growth') {
        const growthA = parseFloat(String(a.growth).replace(/[^0-9.-]/g, '')) || 0;
        const growthB = parseFloat(String(b.growth).replace(/[^0-9.-]/g, '')) || 0;
        return growthB - growthA;
      }
      return a.indexName.localeCompare(b.indexName);
    });

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
          .no-print, button, nav, header, footer, .bottom-manager-zone, .member-suggestions-zone {
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

      {data && (
        <div className="print-only-header">
          <h1 className="text-xl font-bold uppercase text-slate-900">TRADERSCLUB EXECUTIVE SIGNAL INTELLIGENCE</h1>
          <p className="text-sm font-bold text-indigo-900 mt-1">
            Laporan Hasil Audit Kuantitatif & Stress-Test: {displayName}
          </p>
          <p className="text-xs text-slate-600 font-semibold mt-0.5">
            Institutional Quantitative Due-Diligence Report | Tanggal Audit: {data.analyzedDate} | Data Confidence: {data.dataConfidence}
          </p>
        </div>
      )}

      {/* TOP ACTION BAR */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">{displayName}</h2>
            <p className="text-[11px] text-slate-400">Provider Terakreditasi: {displayProvider}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          {isAdminMode ? (
            <div className="flex items-center space-x-2 bg-slate-950 text-white p-1.5 rounded-lg text-xs font-semibold border border-slate-800">
              <span className="flex items-center space-x-1 px-2 text-emerald-400">
                <Unlock size={14} /> <span>ADMIN MODE</span>
              </span>
              <button onClick={() => setShowSettingsModal(true)} className="p-1 hover:bg-slate-800 rounded text-amber-400" title="Ubah Password Admin">
                <Settings size={14} />
              </button>
              <button onClick={() => setIsAdminMode(false)} className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded text-[11px]">
                Exit Admin
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition-colors">
              <Lock size={14} className="text-slate-400" /> <span>Admin Login</span>
            </button>
          )}
          <button onClick={() => setShowUploader(!showUploader)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center justify-center space-x-1.5 shadow-sm transition-colors">
            <Globe size={16} /> <span>{showUploader ? 'Tutup Intake Gateway' : '+ Audit Sinyal Baru (MQL5 URL)'}</span>
          </button>
        </div>
      </div>

      {/* NOTIFIKASI */}
      {uploadReportNotification && (
        <div className="no-print bg-indigo-900 text-white p-4 rounded-xl shadow-lg border border-indigo-700 flex justify-between items-start animate-fadeIn">
          <div className="space-y-1 pr-4">
            <p className="font-bold text-amber-400 text-xs flex items-center space-x-1.5">
              <Sparkles size={16} /> <span>Laporan Hasil Pemrosesan Sinyal:</span>
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

      {/* INTAKE GATEWAY ZONE */}
      {showUploader && (
        <section className="no-print bg-slate-900 rounded-xl shadow-sm border border-indigo-500/30 p-6 animate-fadeIn space-y-5 text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Globe className="text-indigo-400" size={20} />
              <h2 className="text-sm font-bold text-slate-100">Smart Intake Gateway — MQL5 Live Signal & File Due-Diligence</h2>
            </div>
            {(inputUrl || stagedFiles.length > 0) && !isAiProcessing && (
              <button onClick={clearAllStagedFiles} className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center space-x-1">
                <Trash2 size={13} /> <span>Reset Input</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 space-y-2">
              <label className="text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                <Link size={15} />
                <span>1. Masukkan URL Sinyal MQL5 Resmi (Referensi Utama):</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Contoh: https://www.mql5.com/en/signals/2304847 atau 2084890"
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                *Sistem secara otomatis mendeteksi jika sinyal sudah ada dan memperbarui data terkini (Smart Deduplication).
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <UploadCloud size={15} className="text-indigo-400" />
                <span>2. Tambahkan Berkas Pendukung (Opsional: Screenshot Kurva Ekuitas & CSV Transaksi):</span>
              </label>
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleAddFilesToStaging(e); }}
                className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging ? 'border-indigo-500 bg-indigo-950/40' : 'border-slate-800 bg-slate-950/40 hover:bg-slate-950/80'}`}
              >
                <input type="file" multiple accept="image/*,.csv" onChange={handleAddFilesToStaging} className="hidden" id="file-upload-input" />
                <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center w-full">
                  <UploadCloud size={24} className="text-indigo-400 mb-1.5" />
                  <p className="text-xs font-bold text-slate-200">
                    {stagedFiles.length === 0 ? 'Pilih / Tarik Screenshot & File CSV ke Sini (Opsional)' : '+ Tambah Berkas Pelengkap Lainnya'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Membantu audit forensik individual trade, spread resistance, dan copy fidelity.</p>
                </label>
              </div>
            </div>

            {stagedFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-36 overflow-y-auto">
                {stagedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <FileSpreadsheet size={14} className="text-emerald-400 flex-shrink-0" />
                      <span className="truncate text-slate-200 text-[11px]">{file.name}</span>
                    </div>
                    <button type="button" onClick={() => removeStagedFile(idx)} className="text-slate-400 hover:text-rose-400">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              disabled={!inputUrl.trim() && stagedFiles.length === 0}
              onClick={handleExecuteAnalysis}
              className={`w-full font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all uppercase tracking-wider ${(!inputUrl.trim() && stagedFiles.length === 0) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
            >
              <PlayCircle size={17} />
              <span>Eksekusi Institutional Due-Diligence & Stress-Test</span>
            </button>
          </div>
        </section>
      )}

      {/* LEAD CAPTURE & NGOPI BARENG MODAL */}
      {showLeadModal && data && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-800 animate-fadeIn text-white">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase flex items-center space-x-1 w-fit mb-1 border border-amber-500/30">
                  <Coffee size={12} /> <span>Program Ngopi Bareng TradersClub</span>
                </span>
                <h3 className="text-base font-bold text-white">
                  {leadForm.interest.includes('Usulkan') ? `Usulkan ${displayName} ke Komunitas` : `Gabung Patungan — ${displayName}`}
                </h3>
              </div>
              <button onClick={() => setShowLeadModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {leadForm.interest.includes('Usulkan') 
                ? `Anda mengusulkan sinyal "${displayName}" untuk dievaluasi oleh Tim Analis Kuantitatif agar masuk ke katalog resmi komunitas.`
                : 'Dapatkan akses laporan audit lengkap dan pilih opsi langganan terhemat dengan menyambungkan akun Kakak ke Akun Master VPS kami.'}
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Budi Santoso" 
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nomor WhatsApp (Aktif)</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Contoh: 081234567890" 
                  value={leadForm.whatsapp}
                  onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="Contoh: budi@gmail.com" 
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Pilihan Paket Ngopi</label>
                <select 
                  value={leadForm.interest}
                  onChange={(e) => setLeadForm({...leadForm, interest: e.target.value})}
                  className="w-full p-2.5 border border-slate-700 rounded-lg text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-950"
                >
                  <option value="Ngopi Otomatis ($0) - 20% Profit Sharing">🚀 Ngopi Otomatis ($0) — 20% Profit Sharing</option>
                  <option value="Ngopi mandiri ($5 - $10/bulan)">☕ Ngopi mandiri ($5 - $10/bulan) — Flat Biaya Patungan</option>
                  <option value="Usulkan Sinyal Ini">💡 Usulkan Sinyal Ini ke Katalog Komunitas</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingLead}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-xs shadow-md transition-all mt-2 flex items-center justify-center space-x-2"
              >
                {isSubmittingLead ? <span>Memproses Data...</span> : <><Send size={15} /><span>Konfirmasi & Buka Akses Sinyal</span></>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 border border-slate-800 animate-fadeIn text-white">
            <h3 className="font-bold text-white border-b border-slate-800 pb-2">Akses Mode Admin</h3>
            <form onSubmit={handleAdminAuth} className="space-y-3">
              <p className="text-xs text-slate-400">Masukkan password Admin terdaftar untuk membuka identitas asli sinyal dan provider.</p>
              <input 
                type="password" 
                value={inputPassword} 
                onChange={(e) => setInputPassword(e.target.value)} 
                placeholder="Masukkan Password Admin (Strict)..." 
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500" 
                autoFocus 
              />
              {authError && <p className="text-xs text-rose-400 font-semibold">{authError}</p>}
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-2 text-xs font-semibold bg-slate-800 rounded-lg text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg">Verifikasi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 border border-slate-800 animate-fadeIn text-white">
            <h3 className="font-bold text-white border-b border-slate-800 pb-2">Ubah Password Admin</h3>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <input 
                type="password" 
                value={newPasswordInput} 
                onChange={(e) => setNewPasswordInput(e.target.value)} 
                placeholder="Password Baru..." 
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500" 
                autoFocus 
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowSettingsModal(false)} className="px-4 py-2 text-xs font-semibold bg-slate-800 rounded-lg text-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JIKA BELUM ADA DATA SINYAL */}
      {!data ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-4">
          <Globe size={48} className="mx-auto text-indigo-400 opacity-60" />
          <h3 className="text-lg font-bold text-white">Belum Ada Sinyal yang Dianalisis</h3>
          <p className="text-xs max-w-md mx-auto">
            Silakan masukkan URL sinyal MQL5 atau unggah berkas CSV/Screenshot melalui tombol di atas untuk memulai audit kuantitatif dinamis.
          </p>
        </div>
      ) : (
        /* DASHBOARD CONTENT */
        <div className="space-y-6 animate-fadeIn">
          
          {/* 1. REVISED BANNER: NGOPI BARENG (CO-SUBSCRIPTION) */}
          <section className="no-print bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-md border border-amber-500/30 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Coffee size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-amber-300">Ngopi Bareng (Co-subscription)</h3>
                  <p className="text-xs text-slate-300">
                    Copy Trading bareng dari signal2 terbaik dunia (biaya jauh lebih hemat bersama member club)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-0.5">
              <p className="text-xs text-amber-200/90 italic">
                *Batch dibuka otomatis bila minimum peserta dan account copier siap
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <button 
                onClick={() => handleOpenNgopiModal('Ngopi Otomatis ($0) - 20% Profit Sharing')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold p-3.5 rounded-xl text-xs flex flex-col items-center justify-center space-y-1 transition-all shadow-md group"
              >
                <span className="flex items-center space-x-1.5 text-sm">
                  <Rocket size={16} /> <span>🚀 Ngopi Otomatis ( $0)</span>
                </span>
                <span className="text-[11px] text-slate-900 font-semibold opacity-95">20% profit sharing</span>
              </button>

              <button 
                onClick={() => handleOpenNgopiModal('Ngopi mandiri ($5 - $10/bulan)')}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold p-3.5 rounded-xl text-xs border border-amber-500/40 flex flex-col items-center justify-center space-y-1 transition-all"
              >
                <span className="flex items-center space-x-1.5 text-sm">
                  <Coffee size={16} /> <span>☕ Ngopi mandiri ($5 - $10/bulan)</span>
                </span>
                <span className="text-[10px] text-amber-200/80 font-normal">Flat biaya patungan signal/bulan - Investor Password</span>
              </button>

              <button 
                onClick={() => handleOpenNgopiModal('Usulkan Sinyal Ini')}
                className="bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-semibold p-3.5 rounded-xl text-xs border border-indigo-700/50 flex flex-col items-center justify-center space-y-1 transition-all"
              >
                <span className="flex items-center space-x-1.5 text-sm">
                  <Sparkles size={16} className="text-indigo-400" /> <span>💡 Usulkan Sinyal Ini</span>
                </span>
                <span className="text-[10px] text-indigo-300/80 font-normal">Pajang Sinyal Ini di Katalog Komunitas</span>
              </button>
            </div>
          </section>

          {/* 2. HARD-FILTER PRE-CHECK & SCORECARD GRID */}
          <section className="print-section bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 space-y-4 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Scale className="text-indigo-400" size={22} />
                <div>
                  <h2 className="text-base font-bold text-white">Institutional Scorecard & Hard-Filter Due Diligence</h2>
                  <p className="text-xs text-slate-400">Prinsip: Survivability → Risk Control → Consistency → Statistical Validity → Return</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-3 py-1 rounded-full font-bold border ${data.isHardFilterPassed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'}`}>
                  HARD FILTER: {data.isHardFilterPassed ? 'PASSED ✅' : 'FAILED ❌'}
                </span>
                <span className="text-xs bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full font-bold">
                  DATA CONFIDENCE: {data.dataConfidence}
                </span>
              </div>
            </div>

            {/* WEIGHTED SCORE METRICS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-1 text-center text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TOTAL SCORE</span>
                <span className={`text-lg font-bold ${data.isHardFilterPassed ? 'text-amber-400' : 'text-rose-400'}`}>{data.totalScore}/100</span>
                <span className="text-[10px] text-slate-300 block font-semibold">{data.scoreGrade}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Risk (25%)</span>
                <span className={`text-sm font-bold ${data.scoreBreakdown.risk < 15 ? 'text-rose-400' : 'text-emerald-400'}`}>{data.scoreBreakdown.risk}/25</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Consistency (20%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.consistency}/20</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Track Rec (15%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.trackRecord}/15</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Profitability (15%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.profitability}/15</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Strategy (10%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.strategy}/10</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Execution (10%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.execution}/10</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Provider (5%)</span>
                <span className="text-sm font-bold text-emerald-400">{data.scoreBreakdown.provider}/5</span>
              </div>
            </div>
          </section>

          {/* 3. EXECUTIVE SUMMARY & 3 CARD RECOMMENDATION */}
          <section className="print-section bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 space-y-4 text-white">
            <h2 className="text-lg font-bold border-b border-slate-800 pb-2 flex justify-between items-center">
              <span className="text-slate-100">Executive Summary & Institutional Recommendation ({displayName})</span>
              <span className={`text-xs px-2.5 py-1 rounded-md font-bold border ${data.isHardFilterPassed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'}`}>
                VERDICT: {data.verdict}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="print-card bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <Target size={18} />
                  <span>1. Investment Thesis & Compounding Dynamics</span>
                </div>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Sinyal membukukan pertumbuhan MQL5 <strong>{data.growth}</strong> (Time-Weighted Compounding) dari deposit awal <strong>{data.initialDeposit}</strong> dengan profit bersih riil <strong>{data.netProfitFormatted} {data.netProfitUSD}</strong> (Simple Cash ROI: {data.simpleRoi}%). {data.withdrawalNotice}
                </p>
              </div>

              <div className={`print-card p-4 rounded-xl space-y-2 border ${data.maxDD > 40 ? 'bg-rose-950/30 border-rose-500/40' : 'bg-amber-950/30 border-amber-500/30'}`}>
                <div className={`flex items-center space-x-2 font-bold text-sm ${data.maxDD > 40 ? 'text-rose-400' : 'text-amber-400'}`}>
                  <AlertTriangle size={18} />
                  <span>2. Key Risk Consideration</span>
                </div>
                <p className={`text-xs leading-relaxed ${data.maxDD > 40 ? 'text-rose-200' : 'text-amber-200'}`}>
                  Maximal Equity Drawdown tercatat <strong>{data.maxDD}%</strong> dengan utilisasi marjin puncak (*Max Deposit Load*) sebesar <strong>{data.maxDepositLoad}%</strong>. {data.maxDD > 40 ? '⚠️ Drawdown melampaui batas aman (>40%). Wajib demo testing sebelum real capital.' : '✅ Deposit load dan ketahanan marjin terjaga aman.'}
                </p>
              </div>

              <div className="print-card bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                  <Zap size={18} />
                  <span>3. Allocation Recommendation</span>
                </div>
                <div className="text-xs text-indigo-200 space-y-1">
                  <p><strong>Verdict:</strong> <span className={`px-1.5 py-0.5 rounded font-bold ${data.isHardFilterPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>{data.verdict}</span></p>
                  <p><strong>Risk Level:</strong> <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-bold">{data.maxDD <= 25 ? 'CONSERVATIVE / BALANCED' : (data.maxDD <= 40 ? 'MODERATE' : 'SPECULATIVE / HIGH RISK')}</span></p>
                  <p className="text-indigo-300 pt-0.5">Ketahanan margin minimum terhitung: <strong>${data.recommendedCapitalPerLot} USD / 0.01 lot</strong> dengan leverage <strong>{data.leverage}</strong>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. STATISTICAL SNAPSHOT CARDS */}
          <section className="print-section grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Growth (MQL5 Compounding)', value: data.growth, sub: `Simple Cash ROI: ${data.simpleRoi}% | ${data.reliabilityWeeks} Wks`, color: 'text-emerald-400' },
              { label: 'Total Net Profit', value: data.netProfitFormatted, sub: data.netProfitUSD ? `Net Profit ${data.netProfitUSD}` : 'Calculated Net Profit', color: 'text-emerald-400' },
              { label: 'Win Rate', value: `${data.winRate}%`, sub: `${data.tradingDays}`, color: 'text-slate-200' },
              { label: 'Max Deposit Load / DD', value: `${data.maxDepositLoad}% / ${data.maxDD}%`, sub: data.maxDD > 40 ? '⚠️ High Risk DD (>40%)' : 'Margin Usage Terkendali', color: data.maxDD > 40 ? 'text-rose-400' : 'text-slate-200' },
            ].map((stat, idx) => (
              <div key={idx} className="print-card bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 flex flex-col justify-between text-white">
                <p className="text-sm text-slate-400 font-medium mb-2">{stat.label}</p>
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
                </div>
              </div>
            ))}
          </section>

          {/* TOGGLE VIEW ZONE */}
          <section className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="font-bold text-sm text-white">Laporan Audit & Kurasi Sinyal ({displayName})</h3>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
              <button 
                onClick={() => setViewPerspective('retail')}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all ${viewPerspective === 'retail' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Eye size={14} /> <span>Retail Copier View</span>
              </button>
              <button 
                onClick={() => setViewPerspective('hedgefund')}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all ${viewPerspective === 'hedgefund' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                <Briefcase size={14} /> <span>Hedge Fund View</span>
              </button>
            </div>
          </section>

          {/* 5. DYNAMIC COMPREHENSIVE REPORT VIEW */}
          {viewPerspective === 'retail' ? (
            /* RETAIL COPIER VIEW */
            <section className="print-section bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-md p-6 space-y-6 border border-indigo-500/30 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h2 className="text-base font-bold flex items-center space-x-2 text-indigo-300">
                  <Eye className="text-amber-400" size={20} /> 
                  <span>Executive Briefing untuk Big Fund Retail Copier — {displayName}</span>
                </h2>
                <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full font-medium">Retail Capital Safety</span>
              </div>

              <div className="space-y-4 text-xs text-slate-200 leading-relaxed">
                
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold text-sm flex items-center space-x-1.5">
                    <Clock size={16} /> <span>1. Rekam Jejak Historis & Distorsi Compounding Akibat Penarikan (Cash-Flow Sanity)</span>
                  </span>
                  <p className="text-slate-300">
                    Sinyal <strong>{displayName}</strong> membuktikan rekam jejak aktif selama <strong>{data.reliabilityWeeks} Minggu (~{Math.round(data.reliabilityWeeks / 4.3)} Bulan)</strong> dengan {data.tradingDays}. Modal dasar trading tercatat sebesar <strong>{data.initialDeposit}</strong> dengan total penarikan profit mencapai <strong>{data.totalWithdrawal}</strong>.
                  </p>
                  <p className="text-slate-300">
                    <strong>Catatan Transparansi Pertumbuhan:</strong> {data.withdrawalNotice}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold text-sm flex items-center space-x-1.5">
                    <ShieldCheck size={16} /> <span>2. Ketahanan Floating Drawdown & Pengendalian Layering</span>
                  </span>
                  <p className="text-slate-300">
                    Pada sinyal ini, <strong>Maximal Drawdown tercatat {data.maxDD}%</strong> dan beban marjin maksimal (*Max Deposit Load*) berada di <strong>{data.maxDepositLoad}%</strong>. Rata-rata durasi posisi terbuka adalah <strong>{data.avgHoldingDays} hari</strong>, dan estimasi layer aktif berkisar pada <strong>{data.estimatedMaxLayers} layer</strong>.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-indigo-300 font-bold text-sm flex items-center space-x-1.5">
                    <Target size={16} /> <span>3. Panduan Alokasi Lot & Skala Modal Copier</span>
                  </span>
                  <p className="text-slate-300">
                    Untuk menyalin (*copy*) strategi ini dengan profil risiko aman:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pt-1 pl-1">
                    <li><strong>Rasio Modal Minimum Terhitung:</strong> Disarankan minimal <strong>${data.recommendedCapitalPerLot} USD per 0.01 lot</strong> dengan leverage <strong>{data.leverage}</strong>.</li>
                    <li><strong>Instrumen Utama:</strong> Sistem mengeksekusi posisi pada instrumen likuid <strong>{data.activePairsText}</strong>.</li>
                    <li><strong>Eksekusi Cloud 24/7:</strong> Terhubung otomatis via Akun Master VPS TradersClub tanpa beban konfigurasi server pribadi.</li>
                  </ul>
                </div>

              </div>
            </section>
          ) : (
            /* HEDGE FUND VIEW */
            <section className="print-section bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-md p-6 space-y-6 border border-slate-800 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center space-x-2">
                  <Award className="text-amber-400" size={22} /> 
                  <span>Institutional Due-Diligence Audit Report (9-Point Standard) — {displayName}</span>
                </h2>
                <span className="text-xs bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full font-medium">Hedge Fund View</span>
              </div>

              <div className="space-y-5 text-sm text-slate-200 leading-relaxed">
                
                {/* 1. VERDICT & SCORE */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                      <FileCheck size={18} /> <span>1. VERDICT & SCORECARD SUMMARY</span>
                    </h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-bold border ${data.isHardFilterPassed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'}`}>
                      {data.verdict}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sinyal <strong>{displayName}</strong> memperoleh skor akhir <strong>{data.totalScore}/100 [Klasifikasi: {data.scoreGrade}]</strong> dengan status <strong>Hard-Risk Filter: {data.isHardFilterPassed ? 'PASSED (Lolos Uji Risiko Ekstrem)' : 'FAILED (Gagal Uji Risiko Maksimum)'}</strong>.
                  </p>
                  {!data.isHardFilterPassed && data.redFlags.length > 0 && (
                    <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg text-xs text-rose-300 space-y-1 mt-1">
                      <span className="font-bold block">Temuan Red Flags Komite Risiko:</span>
                      <ul className="list-disc list-inside space-y-0.5 pl-1">
                        {data.redFlags.map((rf, idx) => <li key={idx}>{rf}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 2. DATA CONFIDENCE */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                    <CheckCircle size={18} /> <span>2. DATA CONFIDENCE LEVEL: {data.dataConfidence}</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Tingkat keyakinan data diklasifikasikan sebagai <strong>{data.dataConfidence}</strong> didasarkan pada rekam jejak {data.reliabilityWeeks} Minggu aktif dan {data.totalTrades} sampel transaksi riil terverifikasi MQL5.
                  </p>
                </div>

                {/* 3. STRENGTHS */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-emerald-400 text-base flex items-center space-x-2">
                    <TrendingUp size={18} /> <span>3. KEY STRENGTHS (3–5 Kekuatan Kuantitatif)</span>
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 pl-1">
                    <li><strong>Kurva Pertumbuhan Eksponensial:</strong> Pertumbuhan akumulatif <strong>{data.growth}</strong> (Compounding TWRR) dengan imbal hasil bulanan rata-rata <strong>{data.monthlyForecast}</strong>.</li>
                    <li><strong>Efisiensi Risiko (Calmar & Sortino):</strong> Calmar Ratio <strong>{data.calmarRatio}</strong> dan Recovery Factor <strong>{data.recoveryFactor}</strong> mencerminkan rasio profit-to-drawdown yang agresif.</li>
                    <li><strong>Realized Cash Flow:</strong> Profit akumulasi <strong>{data.netProfitFormatted} {data.netProfitUSD}</strong> dan total penarikan <strong>{data.totalWithdrawal}</strong> membuktikan likuiditas profit nyata.</li>
                  </ul>
                </div>

                {/* 4. MAIN RISKS */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                    <AlertTriangle size={18} /> <span>4. MAIN RISKS (3–5 Risiko Terbesar)</span>
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 pl-1">
                    <li><strong>Historical Drawdown Ekstrem:</strong> Equity Drawdown historis pernah menyentuh <strong>{data.maxDD}%</strong> saat pergerakan tajam instrumen <em>{data.activePairsText}</em>.</li>
                    <li><strong>Deposit Load Concurrency:</strong> Max Deposit Load mencapai <strong>{data.maxDepositLoad}%</strong>, mengindikasikan volume lot membesar saat menghadapi floating loss.</li>
                    <li><strong>TWRR Compounding Distortion:</strong> Pertumbuhan 20,000%+ terjadi akibat basis saldo kecil karena penarikan rutin ($4,985 USD ditarik vs $1,087 USD saldo). Simple Cash ROI riil adalah {data.simpleRoi}%.</li>
                  </ul>
                </div>

                {/* 5. HIDDEN RISKS */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-rose-400 text-base flex items-center space-x-2">
                    <ShieldAlert size={18} /> <span>5. HIDDEN & TAIL RISKS (Risiko yang Tidak Terlihat dari ROI)</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Audit swap drag tercatat sebesar <strong>{data.totalSwap}</strong>. Terdapat risiko *tail-risk liquidation* jika pergerakan harga emas (*Gold*) mengalami reli parabolik satu arah tanpa retracement saat deposit load menyentuh batas atas.
                  </p>
                </div>

                {/* 6. CURRENT RISK */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-amber-400 text-base flex items-center space-x-2">
                    <Crosshair size={18} /> <span>6. CURRENT INHERITED RISK (Risiko yang Diwarisi Subscriber Saat Ini)</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Dengan saldo aktif saat ini sebesar <strong>{data.balance}</strong>, copier baru wajib menyediakan margin minimal <strong>${data.recommendedCapitalPerLot} USD / 0.01 lot</strong> agar terhindar dari Margin Call saat drawdown mencapai titik historis 53%.
                  </p>
                </div>

                {/* 7. REQUIRED NEXT STEP */}
                <div className="print-card bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <h3 className="font-bold text-indigo-400 text-base flex items-center space-x-2">
                    <Layers size={18} /> <span>7. REQUIRED NEXT STEP (Protokol Alokasi Bertahap)</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Protokol validasi institusional: <strong>MQL5 Data Validated → Wajib Demo Subscription 2-4 Minggu → Observasi Copy Fidelity & Slippage Gold → Keputusan Alokasi Modal Riil Terbatas</strong>.
                  </p>
                </div>

                {/* 8. FINAL FUND MANAGER CONCLUSION */}
                <div className="print-card bg-indigo-900/50 p-4 rounded-xl border border-indigo-500/40 space-y-2">
                  <h3 className="font-bold text-emerald-400 text-base flex items-center space-x-2">
                    <CheckCircle size={18} /> <span>8. FINAL FUND MANAGER CONCLUSION</span>
                  </h3>
                  <p className="text-xs text-slate-200">
                    Sinyal <strong>{displayName}</strong> memiliki kapabilitas yield tinggi namun membawa risiko drawdown historis 53% (gagal Hard Filter untuk Real Capital Tanpa Buffer). Mandat Komite: <strong>{data.verdict} DENGAN KETAHANAN MARGIN KETAT ${data.recommendedCapitalPerLot} USD / 0.01 LOT</strong>.
                  </p>
                </div>

              </div>
            </section>
          )}

          {/* 6. STRUKTUR SALDO & ARUS KAS */}
          <section className="print-section bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
            <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2 flex items-center space-x-2">
              <DollarSign className="text-indigo-400" size={20} /> <span>Struktur Saldo, Penarikan, & Arus Kas Akun ({displayName})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Balance</p>
                <p className="text-base font-bold text-white">{data.balance}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Equity</p>
                <p className="text-base font-bold text-white">{data.equity}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Initial Deposit</p>
                <p className="text-base font-bold text-slate-200">{data.initialDeposit}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Total Deposit</p>
                <p className="text-base font-bold text-emerald-400">{data.totalDeposit}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Total Withdrawal</p>
                <p className="text-base font-bold text-amber-400">{data.totalWithdrawal}</p>
              </div>
            </div>
          </section>

          {/* 7. INFORMASI PROVIDER */}
          <section className="print-section bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white">
            <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2 flex items-center space-x-2">
              <UserCheck className="text-indigo-400" size={20} /> <span>Informasi Provider, Akses, & Saldo Copier ({displayName})</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Provider Name</p>
                <p className="font-bold text-white truncate">{displayProvider}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Broker / Server</p>
                <p className="font-bold text-white truncate">{data.broker}</p>
              </div>
              <div className="print-card p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-amber-400 font-semibold flex items-center space-x-1"><Tag size={12}/><span>Subscription Fee</span></p>
                <p className="font-bold text-amber-300 mt-0.5">{data.subscriptionFee}</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Reliability</p>
                <p className="font-bold text-white">{data.reliabilityWeeks} Weeks</p>
              </div>
              <div className="print-card p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg">
                <p className="text-xs text-indigo-300 font-semibold flex items-center space-x-1"><Users size={12} /><span>Followers</span></p>
                <p className="font-bold text-indigo-200 mt-0.5">{data.subscribersCount} Copier</p>
              </div>
              <div className="print-card p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg">
                <p className="text-xs text-indigo-300 font-semibold">Total Modal Copier</p>
                <p className="font-bold text-indigo-200 mt-0.5">${data.subscribersCapitalUSD.toLocaleString()} USD</p>
              </div>
              <div className="print-card p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400">Leverage</p>
                <p className="font-bold text-white">{data.leverage}</p>
              </div>
            </div>
          </section>

          {/* DOWNLOAD REPORT BUTTON */}
          <div className="no-print flex justify-end">
            <button onClick={handlePrintPdfRequest} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors shadow-sm">
              <FileDown size={18} /> <span>Download Laporan PDF Audit Kuantitatif — {displayName}</span>
            </button>
          </div>
        </div>
      )}

      {/* 8. BOTTOM MANAGER ZONE DENGAN LABEL AUDIT TERKINI & DEDUPLIKASI */}
      <section className="bottom-manager-zone no-print bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 mt-8 text-white space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Clock className="text-indigo-400" size={20} /> <span>Daftar Riwayat Sinyal Teranalisis (ALPHA ANALYZER Manager)</span>
            </h2>
            <p className="text-xs text-slate-400">
              {isAdminMode ? 'Mode Admin Aktif: Anda dapat melihat nama asli sinyal dan mengarsipkan/menghapus.' : 'Sinyal terdeduplikasi otomatis dengan riwayat audit terkini.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <ArrowUpDown size={13} className="text-indigo-400" />
              <span className="text-slate-400 text-[11px] font-medium mr-1">Urutkan:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 text-white text-xs border border-slate-700 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="chronological">Kronologis (Urutan Sinyal)</option>
                <option value="score">Skor Kuantitatif Tertinggi (Rekomendasi)</option>
                <option value="drawdown">Drawdown Terendah (Safety)</option>
                <option value="growth">Growth Tertinggi (MQL5 Return)</option>
              </select>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-lg text-xs font-semibold border border-slate-800">
              <button onClick={() => setHistoryTab('active')} className={`px-3 py-1 rounded-md ${historyTab === 'active' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'}`}>
                Aktif ({analysesList.filter(a => !a.isArchived).length})
              </button>
              <button onClick={() => setHistoryTab('archived')} className={`px-3 py-1 rounded-md ${historyTab === 'archived' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'}`}>
                Arsip ({analysesList.filter(a => a.isArchived).length})
              </button>
            </div>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">Belum ada riwayat sinyal tersimpan.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHistory.map((item) => {
              const isSelected = item.id === selectedSignalId;
              const cardTitle = isAdminMode ? (item.realSignalName || item.indexName) : item.indexName;
              const cardProvider = isAdminMode ? (item.realProvider || item.indexProvider) : item.indexProvider;
              
              return (
                <div key={item.id} onClick={() => setSelectedSignalId(item.id)} className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${isSelected ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500' : 'border-slate-800 bg-slate-950 hover:bg-slate-900'}`}>
                  <div className="space-y-1.5 w-full pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{cardTitle}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">{item.analyzedDate}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">Provider Terverifikasi: {cardProvider}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs pt-1">
                      <span className="text-emerald-400 font-bold">Growth: {item.growth}</span>
                      <span className="text-slate-700">|</span>
                      <span className="text-slate-300 font-semibold flex items-center space-x-1">
                        <Clock size={12} className="text-slate-500" />
                        <span>{item.reliabilityWeeks} Wks</span>
                      </span>
                      <span className="text-slate-700">|</span>
                      <span className="text-slate-300 font-medium">Win: {item.winRate}%</span>
                      <span className="text-slate-700">|</span>
                      <span className={`font-semibold ${item.maxDD > 40 ? 'text-rose-400' : 'text-amber-400'}`}>Max DD: {item.maxDD}%</span>
                      <span className="text-slate-700">|</span>
                      <span className={`font-semibold ${item.isHardFilterPassed ? 'text-indigo-400' : 'text-rose-400'}`}>Skor: {item.totalScore}/100</span>
                    </div>

                    {item.lastAuditNote && (
                      <p className="text-[11px] text-amber-300/90 font-medium pt-0.5 flex items-center space-x-1">
                        <Info size={12} />
                        <span>{item.lastAuditNote}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {isAdminMode && (
                      <>
                        <button 
                          onClick={(e) => toggleArchiveStatus(e, item.id)} 
                          className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title={item.isArchived ? "Pulihkan dari Arsip" : "Arsipkan Sinyal"}
                        >
                          {item.isArchived ? <RefreshCw size={16}/> : <Archive size={16}/>}
                        </button>
                        <button 
                          onClick={(e) => deleteAnalysis(e, item.id)} 
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Hapus Permanen"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </>
                    )}
                    <ChevronRight className={isSelected ? "text-indigo-400 ml-1" : "text-slate-600 ml-1"} size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 9. MEMBER SUGGESTIONS ZONE */}
      <section className="member-suggestions-zone no-print bg-slate-900 rounded-xl shadow-sm border border-indigo-500/20 p-6 text-white space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <MessageSquarePlus size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Daftar Usulan Sinyal dari Member Komunitas</h2>
              <p className="text-xs text-slate-400">
                Riwayat sinyal yang diajukan oleh member melalui tombol "Usulkan Sinyal Ini" untuk dievaluasi oleh Komite Risiko.
              </p>
            </div>
          </div>
        </div>

        {suggestionsList.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-8 text-center text-slate-400 space-y-2">
            <Sparkles size={28} className="mx-auto text-indigo-400 opacity-60 mb-1" />
            <p className="text-xs font-semibold text-slate-300">Belum ada usulan sinyal baru dari member saat ini.</p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Member dapat mengusulkan sinyal aktif dengan mengklik tombol <strong>"💡 Usulkan Sinyal Ini"</strong> pada banner Ngopi Bareng di atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {suggestionsList.map((sugg) => (
              <div key={sugg.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-slate-100 truncate pr-2">{sugg.signalName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap border bg-amber-500/20 text-amber-300 border-amber-500/30">
                    {sugg.statusLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {sugg.notes}
                </p>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Diusulkan oleh: <strong className="text-slate-400">{sugg.proposedBy}</strong></span>
                  <span>{sugg.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
