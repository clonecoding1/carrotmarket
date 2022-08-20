import axios from "../axios/axios";

export const postLogin = async (data) => {
  const answer = {result: null};
  try {
    const res = await axios.post("/login", data);
    answer.res = res.data
    answer.result = true
  } catch (err) {
    console.log(err)
    answer.result = false
  }
  return answer
}

export const postSignup = async (data) => {
  const answer = {result: null};
  try {
    const res = await axios.post("/signup", data);
    answer.res = res.data
    answer.result = true
  } catch (err) {
    console.log(err)
    answer.result = false
  }
};

export const dupEmail = async (data) => {
  const answer = {result: null};
  try {
    const res = await axios.post("/api/user/checkemail", data);
    answer.res = res.data
    answer.result = true
  } catch (err) {
    console.log(err)
    answer.result = false
  }
};

export const dupNickname = (data) => {
  const answer = {result: null};
  try {
    axios.post("/api/user/checknickname", data);
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};
