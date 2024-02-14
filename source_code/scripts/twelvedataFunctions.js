async function getTimeSeries(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getQuoteWithChange(symbol, apiKey) {
    const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { price: data.close, change: data.percent_change };
}

async function getSMAAnalysis(symbol, interval, period, apiKey) {
    const url = `https://api.twelvedata.com/sma?symbol=${symbol}&interval=${interval}&period=${period}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const trend = data.values[0].sma > data.values[1].sma ? 'up' : 'down';
    return { latest: data.values[0].sma, trend };
}

