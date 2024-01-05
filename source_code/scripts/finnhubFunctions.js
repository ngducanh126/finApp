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

