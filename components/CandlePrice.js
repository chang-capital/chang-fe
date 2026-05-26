import { useState, useEffect } from "react"
import { fetchTickers } from "@/services/bot";

const CandlePrice = ({ symbol }) => {
    const [price, setPrice] = useState(null)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchTickers(symbol)
                const candles = data.data
                const lastCandle = candles[candles.length - 1]
                const closingPrice = parseFloat(lastCandle[4])

                setPrice(closingPrice)
                setStatus('success')
            } catch (error) {
                setStatus('error')
            }
        }
        load()
        const interval = setInterval(load, 1500); // polling tiap 1.5 detik
        return () => clearInterval(interval);
    }, [symbol])
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Price</h2>
                <p className="text-xl font-mono font-semibold">${price?.toFixed(2)}</p>
            </div>
            {/* candle */}
            <div>
                
            </div>
        </div>
    )
}

export default CandlePrice