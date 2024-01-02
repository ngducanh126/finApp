async function fetchDailyTimeSeries(symbol, apiKey) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data["Time Series (Daily)"];
}

