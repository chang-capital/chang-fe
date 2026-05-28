import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import CandlePrice from "@/components/CandlePrice"
import { getAccountInfo, startRsiStrategy, stopRsiStrategy, getRsiStatus } from "@/services/bot"
import Balance from "@/components/Balance"

const Symbol = () => {
    const [account, setAccount] = useState(null)
    const [statusBot, setStatusBot] = useState()

    const router = useRouter()
    const { symbol } = router.query
    const coin = symbol?.toUpperCase()
    const coinSymbol = coin?.replace(/USDT$/i, '')

    const getAccount = async () => {
        const data = await getAccountInfo()
        if(data) {
            const accountData = data.data.data
            setAccount(accountData)
        } else {
            setAccount(null)
        }
    }

    const startRsiBot = async () => {
        const res = await startRsiStrategy()
        console.log(res.data)
        if(!res) {
            alert('Failed to start RSI bot')
        } else {
            setStatusBot(true)
        }
    }

    const stopRsiBot = async () => {
        const res = await stopRsiStrategy()
        console.log(res.data)
        if(!res) {
            alert('Failed to stop RSI bot')
        } else {
            setStatusBot(false)
        }
    }

    useEffect(() => {
        getAccount()
    }, [statusBot])
    return (
        <div className="mt-24 px-32">
            <Link className="text-blue-500" href="/">Back</Link>
            <h1 className="text-3xl font-bold mt-3">{coin}</h1>
            <hr className="mt-4 pb-4" />
            <Link className="text-blue-500" href={`/${coin}/market-flow`}>Market Flow</Link>

            <CandlePrice symbol={coin} />
            <hr className="mt-4" />
            <Balance account={account} coinSymbol={coinSymbol} />
            <hr/>
            <div className="mt-4">
                {statusBot === false ? (
                <button onClick={startRsiBot} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Start RSI BOT
                </button>
                ) : (
                <div>
                <p className="text-sm font-semibold opacity-75">bot running...</p>
                <button onClick={stopRsiBot} className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                    Stop RSI BOT
                </button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Symbol