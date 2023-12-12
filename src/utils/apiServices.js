// api.js
import axios from "axios";

const BASE_URL = "https://dev.hrd.ipnusantara.com/api/v1";

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiService.interceptors.request.use((config) => {
    const getEmail = localStorage.getItem("user_email");

    // Retrieve the current email from wherever it is stored in your application
    const currentEmail = getEmail; // Replace this with your actual logic to get the email

    // Set the 'user' header based on the current email
    config.headers["user"] = currentEmail;

    return config;
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
    async postData(endpoint, data, config) {
        try {
            const response = await apiService.post(endpoint, data, {
                ...config,
            });
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
            throw error;
        }
    },
};
