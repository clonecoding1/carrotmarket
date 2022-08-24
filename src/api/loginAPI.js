import axios from "../axios/axios";

export const postLogin = async (data) => {
  const answer = { result: null };
  try {
    const res = await axios.post("/user/login", data);
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const postSignup = async (data) => {
  const answer = { result: null };
  try {
    const res = await axios.post("/user/signup", data);
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const dupEmail = async (data) => {
  const answer = { result: null };
  try {
    const res = await axios.post("/user/checkemail", data);
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const dupNickname = async (data) => {
  const answer = { result: null };
  try {
    const res = await axios.post("/user/checknickname", data);
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }

  return answer;
};
