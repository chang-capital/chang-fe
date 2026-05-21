import { useRouter } from "next/router"

const Symbol = () => {
    const router = useRouter()
    const { symbol } = router.query

    return (
        <div className="mt-24 px-32">
            <h1 className="text-3xl font-bold">{symbol?.toUpperCase()}</h1>
            <hr className="mt-4" />
        </div>
    )
}

export default Symbol