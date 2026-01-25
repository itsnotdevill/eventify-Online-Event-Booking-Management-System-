import axios from 'axios';
import toast from 'react-hot-toast';

// Create instance
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';

        // 401: Unauthorized -> Auto Logout
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Optional: Redirect to login or window.location.reload() to clear state
            // window.location.href = '/login'; 
            // Better to let AuthContext react to this if possible, but hard reload is safest for "Service" level
        }

        // Show Toast for errors (except 404s maybe, depending on preference)
        if (error.response?.status !== 404) {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
