import axios from "axios";
import callApi from "@/config/api";

const ROOT_API = "http://localhost:8000";

export async function startRsiStrategy() {
    const url = `${ROOT_API}/bot/start-rsi`;
    return callApi({
        url,
        method: "POST"
    })
}