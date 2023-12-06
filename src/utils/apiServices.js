// api.js
import axios from "axios";

const BASE_URL = "https://dev.hrd.ipnusantara.com/api/v1";

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        user: "herman.ie@cpp.co.id",
    },
});

export default {
    // Example GET request
    async fetchData(endpoint, params) {
        try {
            const response = await apiService.get(endpoint, {
                params: params,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    // Example POST request
    async postData(endpoint, data) {
        try {
            const response = await apiService.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    },

    // Example PUT request
    async putData(endpoint, data) {
        try {
            const response = await apiService.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("Error putting data:", error);
            throw error;
        }
    },
};
