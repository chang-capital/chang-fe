import LiveTradeFeed from "@/components/LiveTradeFeed"
import { useRouter } from "next/router"
import Link from "next/link"

const MarketFlow = () => {
    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()

    return (
        <div className="mt-24 px-32">
            <Link className="text-blue-500" href={`/${coin}`}>Back</Link>
            <h1 className="text-3xl font-bold mt-3">{coin}</h1>
            <hr className="mt-4" />
            <LiveTradeFeed symbol={coin} limit={20} />
        </div>
    )
}

export default MarketFlow