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

async function getEMAandSignal(symbol, interval, short, long, apiKey) {
    const url1 = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&period=${short}&apikey=${apiKey}`;
    const url2 = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&period=${long}&apikey=${apiKey}`;
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const emaShort = (await res1.json()).values[0].ema;
    const emaLong = (await res2.json()).values[0].ema;
    const signal = emaShort > emaLong ? 'bullish' : 'bearish';
    return { emaShort, emaLong, signal };
}

async function getRSIandOverbought(symbol, interval, period, apiKey) {
    const url = `https://api.twelvedata.com/rsi?symbol=${symbol}&interval=${interval}&period=${period}&apikey=${apiKey}`;
    const res = await fetch(url);
    const rsi = (await res.json()).values[0].rsi;
    let status = rsi > 70 ? 'overbought' : rsi < 30 ? 'oversold' : 'neutral';
    return { rsi, status };
}

