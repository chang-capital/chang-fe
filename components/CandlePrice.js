"use client"

import { useState, useEffect, useRef } from "react"
import { createChart, CandlestickSeries, CrosshairMode } from "lightweight-charts"
import { fetchTickers } from "@/services/bot"

const CandlePrice = ({ symbol }) => {
    const [tickers, setTickers] = useState([])
    const [livePrice, setLivePrice] = useState(null)
    const [status, setStatus] = useState("loading")

    const chartContainerRef = useRef(null)
    const chartRef = useRef(null)
    const seriesRef = useRef(null)

    // init chart
    useEffect(() => {
        if (!chartContainerRef.current) return
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 320,

            layout: {
                background: {
                    color: "#0f172a",
                },
                textColor: "#94a3b8",
            },

            grid: {
                vertLines: {
                    color: "#1e293b",
                },
                horzLines: {
                    color: "#1e293b",
                },
            },

            crosshair: {
                mode: CrosshairMode.Normal,
            },

            rightPriceScale: {
                borderColor: "#1e293b",
            },

            timeScale: {
                borderColor: "#1e293b",
                timeVisible: true,
                secondsVisible: false,
            },
        })

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#22c55e",
            downColor: "#ef4444",

            borderUpColor: "#22c55e",
            borderDownColor: "#ef4444",

            wickUpColor: "#22c55e",
            wickDownColor: "#ef4444",
        })

        chartRef.current = chart
        seriesRef.current = candleSeries

        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries.length) return

            const { width } = entries[0].contentRect

            chart.applyOptions({
                width,
            })
        })

        resizeObserver.observe(chartContainerRef.current)

        return () => {
            resizeObserver.disconnect()
            chart.remove()
        }
    }, [])

    // update chart data
    useEffect(() => {
        if (!seriesRef.current || tickers.length === 0) return

        seriesRef.current.setData(tickers)
        chartRef.current.timeScale().fitContent()
    }, [tickers])

    // fetch candle data
    useEffect(() => {
        async function load() {
            try {
                const data = await fetchTickers(symbol)
                const candles = data.data

                const formatted = candles.map((c) => ({
                    time: Math.floor(c[0] / 1000),
                    open: Number(c[1]),
                    high: Number(c[2]),
                    low: Number(c[3]),
                    close: Number(c[4]),
                }))

                const lastCandle = formatted[formatted.length - 1]

                setLivePrice(lastCandle.close)
                setTickers(formatted)

                setStatus("live")
            } catch (err) {
                console.error(err)
                setStatus("error")
            }
        }

        load()
        const interval = setInterval(load, 1500)
        return () => clearInterval(interval)
    }, [symbol])

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-2xl flex items-center">
                    Price

                    <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded ${
                            status === "live"
                                ? "bg-green-100 text-green-700"
                                : status === "error"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                    >
                        {status === "live"
                            ? "live (polling)"
                            : status}
                    </span>
                </h2>

                <p className="text-2xl font-mono font-semibold">
                    ${livePrice?.toFixed(2)}
                </p>
            </div>

            <hr />

            <div className="mt-3">
                <div className="flex gap-8">
                    <h3 className="text-lg font-medium">
                        CHART
                    </h3>

                    <h3 className="text-lg font-medium">
                        INTERVAL = 1 HOUR
                    </h3>

                    <h3 className="text-lg font-medium">
                        LAST 64 HOURS
                    </h3>
                </div>

                <div className="mt-3">
                    <div
                        ref={chartContainerRef}
                        className="w-full rounded-lg overflow-hidden"
                    />
                </div>
            </div>
        </div>
    )
}

export default CandlePrice