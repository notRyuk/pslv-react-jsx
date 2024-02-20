import axios from "axios";
import { useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { selectSession } from "../components/auth/authSlice";

function useCreateRequest() {
    const session = useSelector(selectSession);
    if (!session) {
        return axios.create();
    }
    return axios.create({
        headers: {
            authorization: `Bearer ${session.token}`,
        },
    });
}

export function useGetter(url, config) {
    const request = useCreateRequest();
    return useSWR(
        url,
        async (url) =>
            await request
                .get(url, config)
                .then((res) => res.data)
                .catch((err) => err.response || err)
    );
}

export function usePoster(url, config) {
    const request = useCreateRequest();
    return useSWRMutation(
        url,
        async (url, { arg: data }) =>
            await request
                .post(url, data, config)
                .then((res) => res.data)
                .catch((err) => err.response || err)
    );
}

export function usePutter(url, config) {
    const request = useCreateRequest();
    return useSWRMutation(
        url,
        async (url, { arg: data }) =>
            await request
                .put(url, data, config)
                .then((res) => res.data)
                .catch((err) => err.response || err)
    );
}
