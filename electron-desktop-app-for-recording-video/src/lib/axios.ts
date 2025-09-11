import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
