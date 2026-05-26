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
        </div>
    )
}

export default Symbol