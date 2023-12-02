import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import ApiResponse from "@types_/response";


export function useGetter(url, config) {
    return useSWR<ApiResponse, ApiResponse, string>(url, async (url) => await axios.get(url, config))
}

export function usePoster(url, config) {
    return useSWRMutation<ApiResponse, ApiResponse, string>(url, async (url, data) => await axios.post(url, data, config))
}

export function useAuthGetter(url, config) {
    // create the function after creating redux store
    return useSWR<ApiResponse, ApiResponse, string>(url, async (url) => await axios.get(url, config))
}