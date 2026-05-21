import axios from "axios";

export default async function callApi({ method, url, data = null }) {
    const response = await axios({
        url,
        method,
        data
    }).catch((err) => err.response)

    if (response?.status > 300) {
        const res = {
            error: true,
            message: response.data.message,
            data: null
        }
        return res;
    }

    const {length} = Object.keys(response.data)

    const res = {
        error: false,
        message: "Success",
        data: length > 1 ? response.data : response.data
    }
    
    return res;
}