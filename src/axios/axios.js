import axios from "axios";
import { getCookie } from "../utils/cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});
instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + getCookie("token");
  return config;
});

export default instance;
