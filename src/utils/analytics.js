// src/utils/analytics.js

export function calculateMetrics(csvPositions) {
  if (!csvPositions || csvPositions.length === 0) return null;

  const totalTrades = csvPositions.length;
  const winTrades = csvPositions.filter(p => p.Profit > 0);
  const lossTrades = csvPositions.filter(p => p.Profit < 0);

  const totalNetProfit = csvPositions.reduce((acc, p) => acc + (p.Profit || 0), 0);
  const totalSwap = csvPositions.reduce((acc, p) => acc + (p.Swap || 0), 0);
  
  const winRate = ((winTrades.length / totalTrades) * 100).toFixed(2);
  
  const grossProfit = winTrades.reduce((acc, p) => acc + p.Profit, 0);
  const grossLoss = Math.abs(lossTrades.reduce((acc, p) => acc + p.Profit, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : 'N/A';

  const avgWin = winTrades.length > 0 ? grossProfit / winTrades.length : 0;
  const avgLoss = lossTrades.length > 0 ? grossLoss / lossTrades.length : 1;
  const payoffRatio = (avgWin / avgLoss).toFixed(2);

  // Grouping Performance per Symbol
  const symbolStats = {};
  csvPositions.forEach(p => {
    if (!symbolStats[p.Symbol]) {
      symbolStats[p.Symbol] = { trades: 0, profit: 0, swap: 0, wins: 0 };
    }
    symbolStats[p.Symbol].trades += 1;
    symbolStats[p.Symbol].profit += p.Profit || 0;
    symbolStats[p.Symbol].swap += p.Swap || 0;
    if (p.Profit > 0) symbolStats[p.Symbol].wins += 1;
  });

  const symbolArray = Object.keys(symbolStats).map(sym => ({
    symbol: sym,
    trades: symbolStats[sym].trades,
    profit: symbolStats[sym].profit,
    swap: symbolStats[sym].swap,
    winRate: ((symbolStats[sym].wins / symbolStats[sym].trades) * 100).toFixed(1)
  })).sort((a, b) => b.profit - a.profit);

  const alphaGenerator = symbolArray[0] || null; // Top performing asset
  const profitBleeders = symbolArray.filter(s => s.profit < 0); // Loss-making assets

  return {
    totalTrades,
    totalNetProfit: totalNetProfit.toFixed(2),
    totalSwap: totalSwap.toFixed(2),
    winRate,
    profitFactor,
    payoffRatio,
    symbolArray,
    alphaGenerator,
    profitBleeders,
    swapDragRate: totalNetProfit !== 0 ? Math.abs((totalSwap / totalNetProfit) * 100).toFixed(2) : '0.00'
  };
}