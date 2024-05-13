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

