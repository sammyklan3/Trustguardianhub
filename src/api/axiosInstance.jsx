import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ENVIRONMENT === "production" ? `${import.meta.VITE_PRODUCTION_BACKEND_BASE_URL}/api/` : `${import.meta.env.VITE_LOCAL_BACKEND_BASE_URL}/api/`; // Use the 'process' module to access environment variables

export const axiosInstance = axios.create(
  {
    baseURL: BASE_URL,
    // You can add other configuration options here
  }
);
