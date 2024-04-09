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

