'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTrades } from '@/sevices/bot';

const LiveTradeFeed = ({ symbol, limit }) => {
    const [trades, setTrades] = useState([]);
    const [status, setStatus] = useState('connecting');
    const [lastPrice, setLastPrice] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchTrades(symbol, limit);
                const sorted = [...data.data].reverse();

                setTrades(sorted.map((t) => ({
                    id: t.id,
                    time: t.time,
                    price: t.price,
                    qty: t.qty,
                    isBuy: t.isBuyerMaker === false,
                })));

                setLastPrice(parseFloat(sorted[0].price));
                setStatus('live');
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        }

        load(); // fetch pertama langsung

        const interval = setInterval(load, 1500); // polling tiap 1.5 detik
        return () => clearInterval(interval);
    }, [symbol, limit]);
    return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          {symbol}
          <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
            status === 'live'
              ? 'bg-green-100 text-green-700'
              : status === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {status === 'live' ? 'live (polling)' : status}
          </span>
        </h2>
        {lastPrice && (
          <span className="text-xl font-mono font-semibold">
            ${lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        )}
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs border-b">
            <th className="text-left py-2">Time</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Qty (BTC)</th>
            <th className="text-right py-2">Side</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-1.5 text-gray-400 font-mono text-xs">
                {new Date(t.time).toLocaleTimeString()}
              </td>
              <td className={`py-1.5 text-right font-mono font-medium ${
                t.isBuy ? 'text-green-600' : 'text-red-500'
              }`}>
                {parseFloat(t.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="py-1.5 text-right font-mono text-gray-500">
                {parseFloat(t.qty).toFixed(5)}
              </td>
              <td className="py-1.5 text-right">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  t.isBuy
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {t.isBuy ? 'BUY' : 'SELL'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default LiveTradeFeed