import { useEffect, useState } from "react"

const Balance = ({ account, coinSymbol }) => {
    const [coinBalance, setCoinBalance] = useState(0)
    const [usdtBalance, setUsdtBalance] = useState(0)

    useEffect(() => {
        if(account) {
            const balance = account.balances.find(b => b.asset === coinSymbol)
            const usdt = account.balances.find(b => b.asset === 'USDT')
            setUsdtBalance(usdt ? usdt.free : '0')
            setCoinBalance(balance ? balance.free : '0')
        }
    }, [account])
    return (
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
    )
}

export default Balance