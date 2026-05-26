import MarketFlow from "@/components/MarketFlow"
import { useRouter } from "next/router"
import Link from "next/link"

const MarketFlowPage = () => {
    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()

    return (
        <div className="mt-24 px-32">
            <Link className="text-blue-500" href={`/${coin}`}>Back</Link>
            <h1 className="text-3xl font-bold mt-3">{coin}</h1>
            <hr className="mt-4" />
            <MarketFlow symbol={coin} limit={64} />
        </div>
    )
}

export default MarketFlowPage