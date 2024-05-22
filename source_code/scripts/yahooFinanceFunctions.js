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

