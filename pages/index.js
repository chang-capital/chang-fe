import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-24 px-32">
      <h1 className="text-4xl font-bold">Chang Capital</h1>
      <p className="text-lg text-gray-600 mt-3">
        the next crypto quantitative trading company.
      </p>
      <hr className="mt-4 w-[90%]" />
      <h1 className="text-3xl font-semibold mt-8">What do You Want to Trade?</h1>
      <p className="text-gray-600 mt-2">Choose the cryptocurrency you want to trade:</p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <Link href="/btcusdt" className="py-4 text-center rounded-sm font-medium border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
          <p>BTCUSDT</p>
        </Link>
        <Link href="/ethusdt" className="py-4 text-center rounded-sm font-medium border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
          <p>ETHUSDT</p>
        </Link>
        <Link href="/bnbusdt" className="py-4 text-center rounded-sm font-medium border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
          <p>BNBUSDT</p>
        </Link>
      </div>
    </div>
  );
}
