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

async function getIntradayVolatility(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let closes = data.values.map(v => parseFloat(v.close));
    let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    let variance = closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length;
    return Math.sqrt(variance);
}

async function getGapUpDownScanner(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let gaps = [];
    for (let i = 1; i < data.values.length; i++) {
        let prevClose = parseFloat(data.values[i-1].close);
        let open = parseFloat(data.values[i].open);
        let gap = ((open - prevClose) / prevClose) * 100;
        if (Math.abs(gap) > 2) gaps.push({ date: data.values[i].datetime, gap });
    }
    return gaps;
}

async function get52WeekHighLow(symbol, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let highs = data.values.map(v => parseFloat(v.high));
    let lows = data.values.map(v => parseFloat(v.low));
    return { high: Math.max(...highs), low: Math.min(...lows) };
}

async function getMovingAverageCrossover(symbol, interval, short, long, apiKey) {
    const url1 = `https://api.twelvedata.com/sma?symbol=${symbol}&interval=${interval}&period=${short}&apikey=${apiKey}`;
    const url2 = `https://api.twelvedata.com/sma?symbol=${symbol}&interval=${interval}&period=${long}&apikey=${apiKey}`;
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const smaShort = (await res1.json()).values[0].sma;
    const smaLong = (await res2.json()).values[0].sma;
    const crossover = smaShort > smaLong ? 'golden' : 'death';
    return { smaShort, smaLong, crossover };
}

async function getPriceMomentum(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/momentum?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values[0];
}

async function getRelativeVolume(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let volumes = data.values.map(v => parseInt(v.volume));
    let avg = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    return { current: volumes[0], avg, relative: volumes[0] / avg };
}

async function getSectorLeaders(apiKey) {
    const url = `https://api.twelvedata.com/sectors?apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).data;
}

async function getETFPerformance(apiKey) {
    const url = `https://api.twelvedata.com/etf?apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).data;
}

async function getCryptoCorrelationMatrix(symbols, interval, apiKey) {
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

async function getForexVolatility(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let closes = data.values.map(v => parseFloat(v.close));
    let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    let variance = closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length;
    return Math.sqrt(variance);
}

async function getMarketBreadth(apiKey) {
    const url = `https://api.twelvedata.com/market_breadth?apikey=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

async function getPriceReversalDetector(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let closes = data.values.map(v => parseFloat(v.close));
    let reversal = closes[0] > closes[1] && closes[1] < closes[2];
    return { reversal };
}

async function getMultiTimeframeTrend(symbol, apiKey) {
    const url1 = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`;
    const url2 = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1week&apikey=${apiKey}`;
    const url3 = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1month&apikey=${apiKey}`;
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const res3 = await fetch(url3);
    const d = await res1.json();
    const w = await res2.json();
    const m = await res3.json();
    return { daily: d.values[0].close, weekly: w.values[0].close, monthly: m.values[0].close };
}

async function getAssetSeasonality(symbol, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let months = {};
    for (let v of data.values) {
        let month = v.datetime.split('-')[1];
        months[month] = months[month] || [];
        months[month].push(parseFloat(v.close));
    }
    let avg = {};
    for (let m in months) {
        avg[m] = months[m].reduce((a, b) => a + b, 0) / months[m].length;
    }
    return avg;
}

async function getIntradayPattern(symbol, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let hours = {};
    for (let v of data.values) {
        let hour = v.datetime.split(' ')[1].split(':')[0];
        hours[hour] = hours[hour] || [];
        hours[hour].push(parseFloat(v.close));
    }
    let avg = {};
    for (let h in hours) {
        avg[h] = hours[h].reduce((a, b) => a + b, 0) / hours[h].length;
    }
    return avg;
}

async function getVolatilityBreakout(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let closes = data.values.map(v => parseFloat(v.close));
    let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    let std = Math.sqrt(closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length);
    let breakout = Math.abs(closes[0] - mean) > 2 * std;
    return { breakout };
}

async function getPriceGapStats(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let gaps = [];
    for (let i = 1; i < data.values.length; i++) {
        let prevClose = parseFloat(data.values[i-1].close);
        let open = parseFloat(data.values[i].open);
        let gap = ((open - prevClose) / prevClose) * 100;
        gaps.push(gap);
    }
    return { avg: gaps.reduce((a, b) => a + b, 0) / gaps.length, max: Math.max(...gaps), min: Math.min(...gaps) };
}

async function getRollingBeta(symbol, benchmark, interval, apiKey) {
    const url1 = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const url2 = `https://api.twelvedata.com/time_series?symbol=${benchmark}&interval=${interval}&apikey=${apiKey}`;
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const d1 = await res1.json();
    const d2 = await res2.json();
    let returns1 = d1.values.map((v, i, arr) => i === 0 ? 0 : (parseFloat(v.close) - parseFloat(arr[i-1].close)) / parseFloat(arr[i-1].close));
    let returns2 = d2.values.map((v, i, arr) => i === 0 ? 0 : (parseFloat(v.close) - parseFloat(arr[i-1].close)) / parseFloat(arr[i-1].close));
    let mean1 = returns1.reduce((a, b) => a + b, 0) / returns1.length;
    let mean2 = returns2.reduce((a, b) => a + b, 0) / returns2.length;
    let cov = returns1.map((v, i) => (v - mean1) * (returns2[i] - mean2)).reduce((a, b) => a + b, 0) / returns1.length;
    let var2 = returns2.map(v => (v - mean2) ** 2).reduce((a, b) => a + b, 0) / returns2.length;
    return cov / var2;
}

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

async function getIntradayVolatility(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let closes = data.values.map(v => parseFloat(v.close));
    let mean = closes.reduce((a, b) => a + b, 0) / closes.length;
    let variance = closes.reduce((a, b) => a + (b - mean) ** 2, 0) / closes.length;
    return Math.sqrt(variance);
}

async function getGapUpDownScanner(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let gaps = [];
    for (let i = 1; i < data.values.length; i++) {
        let prevClose = parseFloat(data.values[i-1].close);
        let open = parseFloat(data.values[i].open);
        let gap = ((open - prevClose) / prevClose) * 100;
        if (Math.abs(gap) > 2) gaps.push({ date: data.values[i].datetime, gap });
    }
    return gaps;
}

async function get52WeekHighLow(symbol, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=365&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let highs = data.values.map(v => parseFloat(v.high));
    let lows = data.values.map(v => parseFloat(v.low));
    return { high: Math.max(...highs), low: Math.min(...lows) };
}

async function getMovingAverageCrossover(symbol, interval, short, long, apiKey) {
    const url1 = `https://api.twelvedata.com/sma?symbol=${symbol}&interval=${interval}&period=${short}&apikey=${apiKey}`;
    const url2 = `https://api.twelvedata.com/sma?symbol=${symbol}&interval=${interval}&period=${long}&apikey=${apiKey}`;
    const res1 = await fetch(url1);
    const res2 = await fetch(url2);
    const smaShort = (await res1.json()).values[0].sma;
    const smaLong = (await res2.json()).values[0].sma;
    const crossover = smaShort > smaLong ? 'golden' : 'death';
    return { smaShort, smaLong, crossover };
}

async function getPriceMomentum(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/momentum?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).values[0];
}

async function getRelativeVolume(symbol, interval, apiKey) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    let volumes = data.values.map(v => parseInt(v.volume));
    let avg = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    return { current: volumes[0], avg, relative: volumes[0] / avg };
}

async function getSectorLeaders(apiKey) {
    const url = `https://api.twelvedata.com/sectors?apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).data;
}

async function getETFPerformance(apiKey) {
    const url = `https://api.twelvedata.com/etf?apikey=${apiKey}`;
    const res = await fetch(url);
    return (await res.json()).data;
}

async function getCryptoCorrelationMatrix(symbols, interval, apiKey) {
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

