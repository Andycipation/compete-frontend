import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.BACKEND_SERVER_URL,
  withCredentials: true,
});

export default axiosInstance;
