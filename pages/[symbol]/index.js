import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import CandlePrice from "@/components/CandlePrice"
import { getAccountInfo } from "@/services/bot"

const Symbol = () => {
    const [account, setAccount] = useState(null)
    const [coinBalance, setCoinBalance] = useState(0)
    const [usdtBalance, setUsdtBalance] = useState(0)

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

    useEffect(() => {
        getAccount()
    }, [])

    useEffect(() => {
        if(account && coinSymbol) {
            const balance = account.balances.find(b => b.asset === coinSymbol)
            const usdt = account.balances.find(b => b.asset === 'USDT')
            setUsdtBalance(usdt ? usdt.free : '0')
            setCoinBalance(balance ? balance.free : '0')
        }
    }, [account, coinSymbol])
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
                    <h2 className="text-lg font-semibold">${parseFloat(usdtBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[#26A17B] text-sm">USDT</span></h2>
                    <h2 className="text-lg font-semibold">{coinBalance} <span className="text-sm">
                        {coinSymbol}
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