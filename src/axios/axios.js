import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});
instance.interceptors.request.use((config) => {
  // console.log(config);
  return config;
});

export default instance;
