import axios from "../axios/axios";

export const postLogin = (data) => axios.post("/login", data);

export const postSignup = async (data) => {
  return await axios.post("/signup", data);
};

export const dupEmail = (data) => axios.post("/api/user/checkemail", data);

export const dupNickname = (data) => {
  const answer = { result: null };
  try {
    axios.post("/api/user/checknickname", data);
    axios.post("/api/user/checknickname2", data);
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }

  return answer;
};
