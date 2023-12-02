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
            Authorization: `Bearer ${session.token}`
        }
    })
}

export function useGetter(url, config) {
    const request = createRequest()
    return useSWR(url, async (url) => await request.get(url, config))
}

export function usePoster(url, config) {
    const request = createRequest()
    return useSWRMutation(url, async (url, data) => await request.post(url, data, config))
}