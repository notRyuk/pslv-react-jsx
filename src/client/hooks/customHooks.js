// useGetter.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSession } from "../components/auth/authSlice";

const buildConfig = (config) => {
    const session = useSelector(selectSession)
    return {
        headers: {
            authorization: `Bearer ${session.token}`
        },
        ...config
    }
}

export const useGetter = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get(url, buildConfig(config));
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { data, error, isLoading, refetch: fetchData };
};

export const usePoster = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postRequest = async (dataToPost) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, dataToPost, buildConfig(config));
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, postRequest };
};

export const usePutter = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const putRequest = async (dataToPut) => {
        setIsLoading(true);
        try {
            const response = await axios.put(url, dataToPut, buildConfig(config));
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, putRequest };
};
