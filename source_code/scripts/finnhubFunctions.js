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

