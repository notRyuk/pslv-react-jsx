import axios from "axios";
import { useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { selectSession } from "../components/auth/authSlice";

function createRequest() {
    const session = useSelector(selectSession)
    if(!session) {
        return axios.create()
    }
    return axios.create({
        headers: {
            authorization: `Bearer ${session.token}`
        }
    })
}

export function useGetter(url, config) {
    const request = createRequest()
    return useSWR(url, async (url) => await request.get(url, config).then(res => res.data).catch(err => err.response || err))
}

export function usePoster(url, config) {
    const request = createRequest()
    return useSWRMutation(url, async (url, data) => await request.post(url, data, config))
}

export function usePutter(url, config) {
    const request = createRequest()
    return useSWRMutation(url, async (url, data) => await request.put(url, data, config))
}