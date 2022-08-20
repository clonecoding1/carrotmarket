import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 2000,
})

const api = {
  postLogin: (data) => instance.post("/login", data),
  postSignup: (data) => instance.post("/signup", data),
  dupEmail: (data) => instance.post("/api/user/checkemail", data),
  dupNickname: (data) => instance.post("/api/user/checknickname", data),
}

export default api