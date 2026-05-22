import LiveTradeFeed from "@/components/LiveTradeFeed"
import { useRouter } from "next/router"

const Symbol = () => {
    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()

    return (
        <div className="mt-24 px-32">
            <h1 className="text-3xl font-bold">{coin}</h1>
            <hr className="mt-4" />
            <LiveTradeFeed symbol={coin} />
        </div>
    )
}

export default Symbol