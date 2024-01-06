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

