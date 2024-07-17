import axios from "axios";
import { accessLocalStorage } from "../helpers/accessLocalStorage";
const API = import.meta.env.VITE_BASE_API;

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: API, // Set the base URL from your APIs constants
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = accessLocalStorage("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
