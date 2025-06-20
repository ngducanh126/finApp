async function getStockQuote(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getCompanyProfile(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getCandles(symbol, resolution, from, to, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getForexSymbols(apiKey) {
    const url = `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getCryptoSymbols(apiKey) {
    const url = `https://finnhub.io/api/v1/crypto/symbol?exchange=BINANCE&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getEarningsCalendar(apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/earnings?token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getNewsSentiment(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { buzz: data.buzz, sentiment: data.sentiment, articles: data.articles.slice(0, 5) };
}

async function getPeers(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const peers = await res.json();
    return peers.filter(p => p !== symbol);
}

async function getRecommendationTrends(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const trends = await res.json();
    return trends.map(t => ({ period: t.period, buy: t.buy, hold: t.hold, sell: t.sell }));
}

async function getInsiderTransactions(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.filter(tx => tx.transactionType === 'P' || tx.transactionType === 'S');
}

async function getDividends(symbol, from, to, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/dividend?symbol=${symbol}&from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url);
    const divs = await res.json();
    return divs.map(d => ({ date: d.paymentDate, amount: d.amount }));
}

async function getSplits(symbol, from, to, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/split?symbol=${symbol}&from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getFinancialsReport(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data ? data.data.slice(0, 3) : [];
}

async function getExchangeSymbols(exchange, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=${exchange}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).slice(0, 10);
}

async function getEconomicCalendar(apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/economic?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.economicCalendar ? data.economicCalendar.slice(0, 5) : [];
}

async function getIPOCalendar(apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/ipo?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.ipoCalendar ? data.ipoCalendar.slice(0, 5) : [];
}

async function getUpgradeDowngrade(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/upgrade-downgrade?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).slice(0, 5);
}

async function getSocialSentiment(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { reddit: data.reddit.length, twitter: data.twitter.length };
}

async function getOwnership(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/ownership?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).slice(0, 5);
}

async function getShortInterest(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/short-interest?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).slice(0, 5);
}

async function getSupplyChainRelationships(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/supply-chain?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).relationships;
}

async function getRevenueBreakdown(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/revenue-breakdown?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).breakdown;
}

async function getSupportResistance(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/scan/support-resistance?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getPatternRecognition(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/scan/pattern?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getPriceTarget(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/price-target?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { targetHigh: data.targetHigh, targetLow: data.targetLow, targetMean: data.targetMean };
}

async function getTechnicalIndicators(symbol, resolution, from, to, indicator, apiKey) {
    const url = `https://finnhub.io/api/v1/indicator?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&indicator=${indicator}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getETFProfile(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/etf/profile?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getMutualFundProfile(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/mutual-fund/profile?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getBondProfile(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/bond/profile?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getEconomicData(code, apiKey) {
    const url = `https://finnhub.io/api/v1/economic?code=${code}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getMarketNews(category, apiKey) {
    const url = `https://finnhub.io/api/v1/news?category=${category}&token=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).slice(0, 10);
}

async function getCryptoCandles(symbol, resolution, from, to, apiKey) {
    const url = `https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getForexCandles(symbol, resolution, from, to, apiKey) {
    const url = `https://finnhub.io/api/v1/forex/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getStockTick(symbol, date, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/tick?symbol=${symbol}&date=${date}&token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getQuoteChangePercent(symbol, apiKey) {
    const quote = await getStockQuote(symbol, apiKey);
    return ((quote.c - quote.pc) / quote.pc) * 100;
}

async function get52WeekHighLow(symbol, apiKey) {
    const now = Math.floor(Date.now()/1000);
    const yearAgo = now - 365*24*60*60;
    const candles = await getCandles(symbol, 'D', yearAgo, now, apiKey);
    return { high: Math.max(...candles.h), low: Math.min(...candles.l) };
}

async function getVolatilityIndex(symbol, apiKey) {
    const now = Math.floor(Date.now()/1000);
    const monthAgo = now - 30*24*60*60;
    const candles = await getCandles(symbol, 'D', monthAgo, now, apiKey);
    const closes = candles.c;
    const mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    const variance = closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length;
    return Math.sqrt(variance);
}

async function getSectorPerformance(apiKey) {
    const url = `https://finnhub.io/api/v1/stock/sector-performance?token=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getTrendingStocks(apiKey) {
    const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
    const res = await fetch(url);
    const news = await res.json();
    return news.map(n => n.related).flat();
}

async function getHistoricalDividends(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/dividend?symbol=${symbol}&from=2000-01-01&to=2025-01-01&token=${apiKey}`;
    const res = await fetch(url);
    const divs = await res.json();
    return divs.map(d => ({ date: d.paymentDate, amount: d.amount }));
}

async function getCorrelationMatrix(symbols, apiKey) {
    const now = Math.floor(Date.now()/1000);
    const monthAgo = now - 30*24*60*60;
    let closes = [];
    for (let symbol of symbols) {
        const candles = await getCandles(symbol, 'D', monthAgo, now, apiKey);
        closes.push(candles.c);
    }
    let matrix = [];
    for (let i = 0; i < closes.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < closes.length; j++) {
            let meanI = closes[i].reduce((a, b) => a + b, 0) / closes[i].length;
            let meanJ = closes[j].reduce((a, b) => a + b, 0) / closes[j].length;
            let cov = closes[i].map((v, k) => (v - meanI) * (closes[j][k] - meanJ)).reduce((a, b) => a + b, 0) / closes[i].length;
            let stdI = Math.sqrt(closes[i].map(v => (v - meanI) ** 2).reduce((a, b) => a + b, 0) / closes[i].length);
            let stdJ = Math.sqrt(closes[j].map(v => (v - meanJ) ** 2).reduce((a, b) => a + b, 0) / closes[j].length);
            matrix[i][j] = cov / (stdI * stdJ);
        }
    }
    return matrix;
}

async function getIntradayTrendStrength(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let up = 0, down = 0;
    for (let i = 1; i < closes.length; i++) {
        if (closes[i] > closes[i-1]) up++;
        else if (closes[i] < closes[i-1]) down++;
    }
    return { up, down, trendStrength: (up - down) / closes.length };
}

async function getRollingSharpeRatio(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let returns = closes.map((v, i, arr) => i === 0 ? 0 : (v - arr[i-1]) / arr[i-1]);
    let mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    let std = Math.sqrt(returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length);
    return std === 0 ? 0 : mean / std * Math.sqrt(252);
}

async function getMarketOpenGapStats(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let gaps = [];
    for (let i = 1; i < candles.o.length; i++) {
        let gap = (candles.o[i] - candles.c[i-1]) / candles.c[i-1] * 100;
        gaps.push(gap);
    }
    return { avg: gaps.reduce((a, b) => a + b, 0) / gaps.length, max: Math.max(...gaps), min: Math.min(...gaps) };
}

async function getETFVolatilityLeaders(apiKey) {
    const url = `https://finnhub.io/api/v1/etf/profile?exchange=US&token=${apiKey}`;
    const res = await fetch(url);
    const etfs = await res.json();
    let vols = [];
    for (let e of etfs.slice(0, 10)) {
        const now = Math.floor(Date.now()/1000);
        const monthAgo = now - 30*24*60*60;
        const candles = await getCandles(e.symbol, 'D', monthAgo, now, apiKey);
        let closes = candles.c;
        let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
        let variance = closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length;
        vols.push({ symbol: e.symbol, vol: Math.sqrt(variance) });
    }
    return vols.sort((a, b) => b.vol - a.vol);
}

async function getCryptoDrawdown(symbol, resolution, from, to, apiKey) {
    const candles = await getCryptoCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let maxPeak = closes[0];
    let maxDrawdown = 0;
    for (let c of closes) {
        if (c > maxPeak) maxPeak = c;
        let dd = (maxPeak - c) / maxPeak;
        if (dd > maxDrawdown) maxDrawdown = dd;
    }
    return maxDrawdown;
}

async function getForexSessionPerformance(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/forex/candle?symbol=${symbol}&resolution=60&count=48&token=${apiKey}`;
    const res = await fetch(url);
    const candles = await res.json();
    let sessions = { Asia: 0, Europe: 0, US: 0 };
    for (let i = 0; i < candles.c.length; i++) {
        let hour = new Date(candles.t[i]*1000).getUTCHours();
        if (hour >= 0 && hour < 8) sessions.Asia += candles.c[i] - candles.o[i];
        else if (hour >= 8 && hour < 16) sessions.Europe += candles.c[i] - candles.o[i];
        else sessions.US += candles.c[i] - candles.o[i];
    }
    return sessions;
}

async function getIndexConcentrationScore(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/index/constituents?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let weights = data.constituents.map(c => c.weight);
    let top5 = weights.sort((a, b) => b - a).slice(0, 5).reduce((a, b) => a + b, 0);
    return top5;
}

async function getDividendPayoutRatioTrend(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.map(r => ({ period: r.period, payout: r.report.dividends / r.report.netIncome }));
}

async function getSplitEventImpact(symbol, apiKey) {
    const splits = await getSplits(symbol, '2020-01-01', '2025-01-01', apiKey);
    const now = Math.floor(Date.now()/1000);
    const candles = await getCandles(symbol, 'D', now-60*24*60*60, now, apiKey);
    let impact = splits.map(s => {
        let idx = candles.t.findIndex(t => new Date(t*1000).toISOString().slice(0,10) === s.date);
        if (idx > 0) return candles.c[idx+1] / candles.c[idx-1] - 1;
        return null;
    });
    return impact;
}

async function getEarningsBeatRate(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/earnings?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let beats = data.earningsCalendar.filter(e => e.actual > e.estimate).length;
    let total = data.earningsCalendar.length;
    return total === 0 ? 0 : beats / total;
}

async function getEconomicEventVolatility(event, apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/economic?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let filtered = data.economicCalendar.filter(e => e.event === event);
    return filtered.map(e => Math.abs(e.actual - e.estimate));
}

async function getIntradayRangeBreakout(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let highs = candles.h;
    let lows = candles.l;
    let breakout = highs[0] > Math.max(...highs.slice(1, 6)) || lows[0] < Math.min(...lows.slice(1, 6));
    return breakout;
}

async function get52WeekRelativeStrength(symbol, apiKey) {
    const now = Math.floor(Date.now()/1000);
    const yearAgo = now - 365*24*60*60;
    const candles = await getCandles(symbol, 'D', yearAgo, now, apiKey);
    let perf = (candles.c[0] - candles.c[candles.c.length-1]) / candles.c[candles.c.length-1] * 100;
    return perf;
}

async function getMovingAverageEnvelope(symbol, resolution, from, to, period, percent, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let sma = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
    return { upper: sma * (1 + percent/100), lower: sma * (1 - percent/100) };
}

async function getPriceVolatilityClustering(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let clusters = 0;
    for (let i = 2; i < closes.length; i++) {
        let v1 = Math.abs(closes[i] - closes[i-1]);
        let v2 = Math.abs(closes[i-1] - closes[i-2]);
        if ((v1 > 1 && v2 > 1) || (v1 < 0.5 && v2 < 0.5)) clusters++;
    }
    return clusters;
}

async function getVolumeWeightedMomentum(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let volumes = candles.v;
    let weighted = closes.map((c, i) => c * volumes[i]);
    let momentum = weighted[0] - weighted[weighted.length-1];
    return momentum;
}

async function getSectorDispersion(apiKey) {
    const url = `https://finnhub.io/api/v1/stock/sector-performance?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let changes = data.map(s => s.change);
    let mean = changes.reduce((a, b) => a + b, 0) / changes.length;
    let dispersion = Math.sqrt(changes.reduce((a, b) => a + (b - mean) ** 2, 0) / changes.length);
    return dispersion;
}

async function getETFExpenseRatioRank(apiKey) {
    const url = `https://finnhub.io/api/v1/etf/profile?exchange=US&token=${apiKey}`;
    const res = await fetch(url);
    const etfs = await res.json();
    return etfs.sort((a, b) => a.expenseRatio - b.expenseRatio).slice(0, 10);
}

async function getCryptoLiquidityRank(apiKey) {
    const url = `https://finnhub.io/api/v1/crypto/symbol?exchange=BINANCE&token=${apiKey}`;
    const res = await fetch(url);
    const symbols = await res.json();
    return symbols.sort((a, b) => b.volume - a.volume).slice(0, 10);
}

async function getForexSpreadStats(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/forex/tick?symbol=${symbol}&date=2024-03-27&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let spreads = data.data.map(t => t.ask - t.bid);
    return { avg: spreads.reduce((a, b) => a + b, 0) / spreads.length, max: Math.max(...spreads), min: Math.min(...spreads) };
}

async function getIndexTurnover(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/index/constituents?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.changes;
}

async function getDividendExDateScanner(apiKey) {
    const url = `https://finnhub.io/api/v1/stock/dividend?exchange=US&token=${apiKey}`;
    const res = await fetch(url);
    const divs = await res.json();
    return divs.filter(d => new Date(d.exDate) > new Date()).slice(0, 10);
}

async function getSplitAnnouncementEffect(symbol, apiKey) {
    const splits = await getSplits(symbol, '2020-01-01', '2025-01-01', apiKey);
    const now = Math.floor(Date.now()/1000);
    const candles = await getCandles(symbol, 'D', now-60*24*60*60, now, apiKey);
    let effects = splits.map(s => {
        let idx = candles.t.findIndex(t => new Date(t*1000).toISOString().slice(0,10) === s.date);
        if (idx > 0) return candles.c[idx+1] / candles.c[idx-1] - 1;
        return null;
    });
    return effects;
}

async function getEarningsRevisionTrend(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/stock/upgrade-downgrade?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map(r => ({ date: r.gradeTime, action: r.action }));
}

async function getEconomicCalendarDensity(apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/economic?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let days = {};
    for (let e of data.economicCalendar) {
        let d = e.date;
        days[d] = (days[d] || 0) + 1;
    }
    return days;
}

async function getIntradayMeanReversion(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    let reverts = closes.filter(c => Math.abs(c - mean) < 0.5).length;
    return reverts;
}

async function get52WeekLowVolume(symbol, apiKey) {
    const now = Math.floor(Date.now()/1000);
    const yearAgo = now - 365*24*60*60;
    const candles = await getCandles(symbol, 'D', yearAgo, now, apiKey);
    let lows = Math.min(...candles.l);
    let idx = candles.l.indexOf(lows);
    return candles.v[idx];
}

async function getMovingAverageDeviation(symbol, resolution, from, to, period, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let closes = candles.c;
    let sma = closes.slice(0, period).reduce((a, b) => a + b, 0) / period;
    return closes[0] - sma;
}

async function getPriceActionPattern(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let opens = candles.o;
    let closes = candles.c;
    let engulfing = closes[0] > opens[0] and closes[1] < opens[1] and closes[0] > opens[1] and opens[0] < closes[1];
    return engulfing;
}

async function getVolumeOscillator(symbol, resolution, from, to, short, long, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let volumes = candles.v;
    let shortAvg = volumes.slice(0, short).reduce((a, b) => a + b, 0) / short;
    let longAvg = volumes.slice(0, long).reduce((a, b) => a + b, 0) / long;
    return shortAvg - longAvg;
}

async function getSectorBeta(apiKey) {
    const url = `https://finnhub.io/api/v1/stock/sector-performance?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map(s => ({ sector: s.sector, beta: s.beta }));
}

async function getETFDividendGrowth(apiKey) {
    const url = `https://finnhub.io/api/v1/etf/profile?exchange=US&token=${apiKey}`;
    const res = await fetch(url);
    const etfs = await res.json();
    return etfs.map(e => ({ symbol: e.symbol, growth: e.dividendGrowth }));
}

async function getCryptoVolatilitySurface(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=5&count=100&token=${apiKey}`;
    const res = await fetch(url);
    const candles = await res.json();
    let closes = candles.c;
    let surfaces = [];
    for (let i = 10; i < closes.length; i += 10) {
        let slice = closes.slice(i-10, i);
        let mean = slice.reduce((a, b) => a + b, 0) / slice.length;
        let std = Math.sqrt(slice.reduce((a, b) => a + (b - mean) ** 2, 0) / slice.length);
        surfaces.push(std);
    }
    return surfaces;
}

async function getForexCorrelationStability(symbols, resolution, from, to, apiKey) {
    let closes = [];
    for (let symbol of symbols) {
        const candles = await getForexCandles(symbol, resolution, from, to, apiKey);
        closes.push(candles.c);
    }
    let stabilities = [];
    for (let i = 0; i < closes.length; i++) {
        for (let j = i+1; j < closes.length; j++) {
            let meanI = closes[i].reduce((a, b) => a + b, 0) / closes[i].length;
            let meanJ = closes[j].reduce((a, b) => a + b, 0) / closes[j].length;
            let cov = closes[i].map((v, k) => (v - meanI) * (closes[j][k] - meanJ)).reduce((a, b) => a + b, 0) / closes[i].length;
            let stdI = Math.sqrt(closes[i].map(v => (v - meanI) ** 2).reduce((a, b) => a + b, 0) / closes[i].length);
            let stdJ = Math.sqrt(closes[j].map(v => (v - meanJ) ** 2).reduce((a, b) => a + b, 0) / closes[j].length);
            stabilities.push(cov / (stdI * stdJ));
        }
    }
    return stabilities;
}

async function getIndexSeasonality(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/index/constituents?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    // This is a placeholder for actual seasonality logic
    return data.constituents.map(c => ({ symbol: c.symbol, seasonality: Math.random() }));
}

async function getDividendYieldVolatility(symbol, apiKey) {
    const divs = await getDividends(symbol, '2020-01-01', '2024-01-01', apiKey);
    let yields = divs.map(d => d.amount);
    let mean = yields.reduce((a, b) => a + b, 0) / yields.length;
    let std = Math.sqrt(yields.reduce((a, b) => a + (b - mean) ** 2, 0) / yields.length);
    return std;
}

async function getSplitRatioDistribution(symbol, apiKey) {
    const splits = await getSplits(symbol, '2000-01-01', '2024-01-01', apiKey);
    let ratios = splits.map(s => s.ratio);
    let counts = {};
    for (let r of ratios) counts[r] = (counts[r] || 0) + 1;
    return counts;
}

async function getEarningsVolatilitySurface(symbol, apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/earnings?symbol=${symbol}&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.earningsCalendar.map(e => Math.abs(e.actual - e.estimate));
}

async function getEconomicSurpriseDispersion(apiKey) {
    const url = `https://finnhub.io/api/v1/calendar/economic?token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let surprises = data.economicCalendar.map(e => e.actual - e.estimate);
    let mean = surprises.reduce((a, b) => a + b, 0) / surprises.length;
    let dispersion = Math.sqrt(surprises.reduce((a, b) => a + (b - mean) ** 2, 0) / surprises.length);
    return dispersion;
}

async function getIntradayLiquidityHeatmap(symbol, resolution, from, to, apiKey) {
    const candles = await getCandles(symbol, resolution, from, to, apiKey);
    let volumes = candles.v;
    let hours = {};
    for (let i = 0; i < candles.t.length; i++) {
        let hour = new Date(candles.t[i]*1000).getUTCHours();
        hours[hour] = (hours[hour] || 0) + volumes[i];
    }
    return hours;
}

