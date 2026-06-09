import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here
        const message = error.response?.data?.status_message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
