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

async function getMACDHistogram(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/macd?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { macd: data.values[0].macd, histogram: data.values[0].histogram };
}

async function getBollingerBands(symbol, interval, period, apiKey) {
    const url = `https://api.twelvedata.com/bbands?symbol=${symbol}&interval=${interval}&period=${period}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const breakout = data.values[0].close > data.values[0].upper_band || data.values[0].close < data.values[0].lower_band;
    return { upper: data.values[0].upper_band, lower: data.values[0].lower_band, breakout };
}

async function getADXStrength(symbol, interval, period, apiKey) {
    const url = `https://api.twelvedata.com/adx?symbol=${symbol}&interval=${interval}&period=${period}&apikey=${apiKey}`;
    const res = await fetch(url);
    const adx = (await res.json()).values[0].adx;
    return { adx, strength: adx > 25 ? 'strong' : 'weak' };
}

async function getATRVolatility(symbol, interval, period, apiKey) {
    const url = `https://api.twelvedata.com/atr?symbol=${symbol}&interval=${interval}&period=${period}&apikey=${apiKey}`;
    const res = await fetch(url);
    const atr = (await res.json()).values[0].atr;
    return { atr };
}

async function getStochasticOscillator(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/stoch?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const cross = data.values[0].slow_k > data.values[0].slow_d ? 'bullish' : 'bearish';
    return { slow_k: data.values[0].slow_k, slow_d: data.values[0].slow_d, cross };
}

async function getPivotPoints(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/pivot_points?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values[0];
}

async function getVWAPTrend(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/vwap?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const vwap = (await res.json()).values[0].vwap;
    return { vwap };
}

async function getPriceRangeSummary(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let highs = data.values.map(v => parseFloat(v.high));
    let lows = data.values.map(v => parseFloat(v.low));
    let closes = data.values.map(v => parseFloat(v.close));
    return { high: Math.max(...highs), low: Math.min(...lows), close: closes[0] };
}

async function getVolumeSpikeDetector(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let volumes = data.values.map(v => parseInt(v.volume));
    let avg = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    let spike = volumes[0] > avg * 2;
    return { volume: volumes[0], spike };
}

async function getMultiAssetCorrelation(symbols, interval, apiKey) {
    let closes = [];
    for (let symbol of symbols) {
        const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        closes.push(data.values.map(v => parseFloat(v.close)));
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

async function getETFConstituents(symbol, apiKey) {
    const url = `https://api.twelvedata.com/etf?symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).holdings;
}

async function getCryptoMarketLeaders(apiKey) {
    const url = `https://api.twelvedata.com/cryptocurrencies?apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.sort((a, b) => parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h)).slice(0, 5);
}

async function getForexHeatmap(apiKey) {
    const url = `https://api.twelvedata.com/forex_pairs?apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.map(pair => ({ symbol: pair.symbol, change: pair.percent_change }));
}

async function getIndexPerformance(apiKey) {
    const url = `https://api.twelvedata.com/indices?apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.map(idx => ({ symbol: idx.symbol, change: idx.percent_change }));
}

async function getDividendHistory(symbol, apiKey) {
    const url = `https://api.twelvedata.com/dividends?symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values;
}

async function getSplitHistory(symbol, apiKey) {
    const url = `https://api.twelvedata.com/splits?symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values;
}

async function getEarningsCalendar(symbol, apiKey) {
    const url = `https://api.twelvedata.com/earnings?symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values;
}

async function getEconomicEvents(apiKey) {
    const url = `https://api.twelvedata.com/economic_events?apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values;
}

