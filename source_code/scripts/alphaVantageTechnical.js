async function fetchDailyTimeSeries(symbol, apiKey) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data["Time Series (Daily)"];
}

async function getLatestClose(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    return parseFloat(series[dates[0]]["4. close"]);
}

async function getMovingAverage(symbol, apiKey, period = 20) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const closes = Object.values(series).map(day => parseFloat(day["4. close"]));
    if (closes.length < period) return null;
    let sum = 0;
    for (let i = 0; i < period; i++) sum += closes[i];
    return sum / period;
}

async function detectGoldenCross(symbol, apiKey, shortPeriod = 50, longPeriod = 200) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const closes = Object.values(series).map(day => parseFloat(day["4. close"]));
    if (closes.length < longPeriod + 1) return false;
    const shortMA = closes.slice(0, shortPeriod).reduce((a, b) => a + b, 0) / shortPeriod;
    const longMA = closes.slice(0, longPeriod).reduce((a, b) => a + b, 0) / longPeriod;
    const prevShortMA = closes.slice(1, shortPeriod + 1).reduce((a, b) => a + b, 0) / shortPeriod;
    const prevLongMA = closes.slice(1, longPeriod + 1).reduce((a, b) => a + b, 0) / longPeriod;
    return prevShortMA < prevLongMA && shortMA > longMA;
}

async function fetchRSI(symbol, apiKey, period = 14) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const closes = Object.values(series).map(day => parseFloat(day["4. close"]));
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
        let diff = closes[i] - closes[i-1];
        if (diff >= 0) gains += diff;
        else losses -= diff;
    }
    let rs = gains / (losses || 1);
    return 100 - (100 / (1 + rs));
}

async function getTopVolumeDay(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    let maxVol = 0, maxDate = null;
    for (const [date, day] of Object.entries(series)) {
        const vol = parseInt(day["5. volume"]);
        if (vol > maxVol) {
            maxVol = vol;
            maxDate = date;
        }
    }
    return { date: maxDate, volume: maxVol };
}

async function fetchIntradayVolatility(symbol, apiKey, interval = "5min") {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const series = data[`Time Series (${interval})`];
    const prices = Object.values(series).map(d => parseFloat(d["4. close"]));
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + (b - mean) ** 2, 0) / prices.length;
    return Math.sqrt(variance);
}

async function compareTwoStocks(symbol1, symbol2, apiKey) {
    const s1 = await fetchDailyTimeSeries(symbol1, apiKey);
    const s2 = await fetchDailyTimeSeries(symbol2, apiKey);
    const dates = Object.keys(s1).filter(date => s2[date]);
    const perf1 = (parseFloat(s1[dates[0]]["4. close"]) - parseFloat(s1[dates[dates.length-1]]["4. close"])) / parseFloat(s1[dates[dates.length-1]]["4. close"]);
    const perf2 = (parseFloat(s2[dates[0]]["4. close"]) - parseFloat(s2[dates[dates.length-1]]["4. close"])) / parseFloat(s2[dates[dates.length-1]]["4. close"]);
    return { [symbol1]: perf1, [symbol2]: perf2 };
}

async function fetchAndPlotMACD(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const closes = Object.values(series).map(day => parseFloat(day["4. close"]));
    function getEMA(data, period) {
        let k = 2 / (period + 1);
        let ema = data[0];
        for (let i = 1; i < data.length; i++) {
            ema = data[i] * k + ema * (1 - k);
        }
        return ema;
    }
    let ema12 = getEMA(closes, 12);
    let ema26 = getEMA(closes, 26);
    let macd = ema12 - ema26;
    let signal = getEMA([macd], 9);
    return { macd, signal };
}

async function alertOnPriceDrop(symbol, apiKey, thresholdPercent = 5) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    const today = parseFloat(series[dates[0]]["4. close"]);
    const yesterday = parseFloat(series[dates[1]]["4. close"]);
    const drop = ((yesterday - today) / yesterday) * 100;
    return drop >= thresholdPercent;
}

async function fetchSMAHistory(symbol, apiKey, period = 20) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const closes = Object.values(series).map(day => parseFloat(day["4. close"]));
    let smaHistory = [];
    for (let i = 0; i < closes.length - period + 1; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) sum += closes[i + j];
        smaHistory.push(sum / period);
    }
    return smaHistory;
}

async function fetchPriceGapDays(symbol, apiKey, gapPercent = 3) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    let gaps = [];
    for (let i = 1; i < dates.length; i++) {
        let prevClose = parseFloat(series[dates[i-1]]["4. close"]);
        let open = parseFloat(series[dates[i]]["1. open"]);
        let gap = ((open - prevClose) / prevClose) * 100;
        if (Math.abs(gap) >= gapPercent) gaps.push({ date: dates[i], gap });
    }
    return gaps;
}

async function fetchHighestHigh(symbol, apiKey, days = 30) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse().slice(0, days);
    let maxHigh = 0, maxDate = null;
    for (let date of dates) {
        let high = parseFloat(series[date]["2. high"]);
        if (high > maxHigh) {
            maxHigh = high;
            maxDate = date;
        }
    }
    return { date: maxDate, high: maxHigh };
}

async function fetchLowestLow(symbol, apiKey, days = 30) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse().slice(0, days);
    let minLow = Number.MAX_VALUE, minDate = null;
    for (let date of dates) {
        let low = parseFloat(series[date]["3. low"]);
        if (low < minLow) {
            minLow = low;
            minDate = date;
        }
    }
    return { date: minDate, low: minLow };
}

async function fetchAverageVolume(symbol, apiKey, days = 30) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse().slice(0, days);
    let total = 0;
    for (let date of dates) {
        total += parseInt(series[date]["5. volume"]);
    }
    return total / days;
}

async function fetchPriceChangePercent(symbol, apiKey, days = 7) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    let start = parseFloat(series[dates[days]]["4. close"]);
    let end = parseFloat(series[dates[0]]["4. close"]);
    return ((end - start) / start) * 100;
}

async function fetchConsecutiveGains(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    let count = 0;
    for (let i = 1; i < dates.length; i++) {
        let prev = parseFloat(series[dates[i-1]]["4. close"]);
        let curr = parseFloat(series[dates[i]]["4. close"]);
        if (curr > prev) count++;
        else break;
    }
    return count;
}

async function fetchConsecutiveLosses(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    let count = 0;
    for (let i = 1; i < dates.length; i++) {
        let prev = parseFloat(series[dates[i-1]]["4. close"]);
        let curr = parseFloat(series[dates[i]]["4. close"]);
        if (curr < prev) count++;
        else break;
    }
    return count;
}

async function fetchBiggestOneDayMove(symbol, apiKey) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse();
    let maxMove = 0, moveDate = null;
    for (let i = 1; i < dates.length; i++) {
        let prev = parseFloat(series[dates[i-1]]["4. close"]);
        let curr = parseFloat(series[dates[i]]["4. close"]);
        let move = Math.abs(curr - prev);
        if (move > maxMove) {
            maxMove = move;
            moveDate = dates[i];
        }
    }
    return { date: moveDate, move: maxMove };
}

async function fetchPercentGreenDays(symbol, apiKey, days = 30) {
    const series = await fetchDailyTimeSeries(symbol, apiKey);
    const dates = Object.keys(series).sort().reverse().slice(0, days);
    let green = 0;
    for (let i = 1; i < dates.length; i++) {
        let prev = parseFloat(series[dates[i-1]]["4. close"]);
        let curr = parseFloat(series[dates[i]]["4. close"]);
        if (curr > prev) green++;
    }
    return (green / (dates.length - 1)) * 100;
}

