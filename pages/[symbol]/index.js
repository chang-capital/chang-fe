import { useRouter } from "next/router"
import Link from "next/link"
import CandlePrice from "@/components/CandlePrice"

const Symbol = () => {
    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()

    return (
        <div className="mt-24 px-32">
            <Link className="text-blue-500" href="/">Back</Link>
            <h1 className="text-3xl font-bold mt-3">{coin}</h1>
            <hr className="mt-4 pb-4" />
            <Link className="text-blue-500" href={`/${coin}/market-flow`}>Market Flow</Link>

            <CandlePrice symbol={coin} />
            <hr className="mt-4" />
            <div className="py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    BALANCE
                </h2>
                <div className="flex gap-1 flex-col items-end">
                    <h2 className="text-lg font-semibold">$0.00 <span className="text-[#26A17B] text-sm">USDT</span></h2>
                    <h2 className="text-lg font-semibold">0.001 <span className="text-sm">
                        {coin === "BTCUSDT" ? "BTC" : coin === "ETHUSDT" ? "ETH" : coin}
                    </span></h2>
                </div>
            </div>
            <hr/>
            <div className="mt-4">
                <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Start RSI BOT
                </button>
            </div>
        </div>
    )
}

export default Symbol