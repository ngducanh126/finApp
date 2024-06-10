async function getQuoteSummary(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getHistoricalPrices(symbol, period1, period2, interval, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&period1=${period1}&period2=${period2}&interval=${interval}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getTrendingTickers(apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=US`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getCompanyInsights(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getFinancials(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getEarningsCalendar(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-earnings?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getOptionsChain(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-options?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getAnalystRecommendations(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getInstitutionalHolders(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-institutional-holders?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getInsiderTransactions(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-insider-transactions?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getDividendHistory(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    const data = await res.json();
    return data.dividends;
}

async function getSplitHistory(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    const data = await res.json();
    return data.splits;
}

async function getSectorPerformance(apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-sector-performance?region=US`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getIndexConstituents(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-index-constituents?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getETFHoldings(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/etf/v2/get-holdings?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getCryptoMarketData(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/crypto/v2/get-crypto?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getForexRates(pair, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=${pair}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getMutualFundProfile(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/mutualfund/v2/get-profile?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getBondProfile(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/bond/v2/get-profile?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getMarketNews(apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=20`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getPriceTargetConsensus(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    const data = await res.json();
    return data.priceTarget;
}

async function getTechnicalIndicators(symbol, interval, range, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?symbol=${symbol}&interval=${interval}&range=${range}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

async function getPatternRecognition(symbol, apiKey) {
    // Placeholder for pattern recognition logic
    return { pattern: 'engulfing', detected: Math.random() > 0.5 };
}

async function getSupportResistance(symbol, apiKey) {
    // Placeholder for support/resistance logic
    return { support: Math.random() * 100, resistance: Math.random() * 120 };
}

async function get52WeekHighLow(symbol, apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    const data = await res.json();
    return { high: data.fiftyTwoWeekHigh, low: data.fiftyTwoWeekLow };
}

async function getVolatilityIndex(symbol, apiKey) {
    // Placeholder for volatility index logic
    return { vix: Math.random() * 40 };
}

async function getShortInterest(symbol, apiKey) {
    // Placeholder for short interest logic
    return { shortPercent: Math.random() * 10 };
}

async function getOwnershipBreakdown(symbol, apiKey) {
    // Placeholder for ownership breakdown
    return { institutional: Math.random() * 80, insider: Math.random() * 10 };
}

async function getSocialSentiment(symbol, apiKey) {
    // Placeholder for social sentiment
    return { reddit: Math.floor(Math.random() * 100), twitter: Math.floor(Math.random() * 100) };
}

async function getUpgradeDowngrade(symbol, apiKey) {
    // Placeholder for upgrade/downgrade
    return { upgrades: Math.floor(Math.random() * 5), downgrades: Math.floor(Math.random() * 5) };
}

async function getIPOCalendar(apiKey) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-ipo-calendar?region=US`;
    const res = await fetch(url, { headers: { 'x-rapidapi-key': apiKey } });
    return await res.json();
}

