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

