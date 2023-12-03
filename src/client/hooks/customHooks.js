// useGetter.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useGetter = (url, config = {}, depend = []) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, config);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, depend);

    return { data, error, isLoading };
};

export const usePoster = (url, config = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postRequest = async (dataToPost) => {
        setIsLoading(true);

        try {
            const response = await axios.post(url, dataToPost, config);
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
            const response = await axios.put(url, dataToPut, config);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, putRequest };
};
