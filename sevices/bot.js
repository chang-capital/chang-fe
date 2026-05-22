import axios from "axios";
import callApi from "@/config/api";

const ROOT_API = "http://localhost:8000";

// rsi strategy
export async function startRsiStrategy() {
    const url = `${ROOT_API}/bot/start-rsi`;
    return callApi({
        url,
        method: "POST"
    })
}

export async function stopRsiStrategy() {
    const url = `${ROOT_API}/bot/stop-rsi`;
    return callApi({
        url,
        method: "POST"
    })
}

export async function getRsiStatus() {
    const url = `${ROOT_API}/bot/rsi-status`;
    return callApi({
        url,
        method: "GET"
    })
}

export async function fetchTrades(symbol, limit) {
    const url = `https://data-api.binance.vision/api/v3/trades?symbol=${symbol}&limit=${limit || 10}`;
    return callApi({
        url,
        method: "GET"
    })
}

export async function fetchTickers(symbol, interval = '1h', limit = 64) {
    const url = `https://data-api.binance.vision/api/v3/klines` +
        `?symbol=${symbol}` +
        `&interval=${interval}` +
        `&limit=${limit}`;
    return callApi({
        url,
        method: "GET"
    })
}