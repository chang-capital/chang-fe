import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { fetchTickers } from "@/services/bot";

const Symbol = () => {
    const [price, setPrice] = useState(null)
    const [status, setStatus] = useState('loading')

    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()

    // useEffect(() => {
    //     async function load() {
    //         try {
    //             const data = await fetchTickers(coin)
    //             console.log("fetchTickers", data.data)
    //         } catch (error) {
    //             setStatus('error')
    //         }
    //     }
    //     load()
    //     const interval = setInterval(load, 1500); // polling tiap 1.5 detik
    //     return () => clearInterval(interval);
    // }, [symbol])

    return (
        <div className="mt-24 px-32">
            <Link className="text-blue-500" href="/">Back</Link>
            <h1 className="text-3xl font-bold mt-3">{coin}</h1>
            <hr className="mt-4 pb-4" />
            <Link className="text-blue-500" href={`/${coin}/market-flow`}>Market Flow</Link>

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Price</h2>
                    <p className="text-xl font-mono font-semibold">$123.45</p>
                </div>
            </div>
        </div>
    )
}

export default Symbol