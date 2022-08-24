import axios from "../axios/axios";

export const getUser = async () => {
  const answer = { result: null };
  try {
    const res = await axios.get("/user");
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const deleteUser = async () => {
  const answer = { result: null };
  try {
    const res = await axios.delete("/user/mypage");
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const getLikeList = async () => {
  const answer = { result: null };
  try {
    const res = await axios.get("/user/likelist");
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};

export const getMyList = async () => {
  const answer = { result: null };
  try {
    const res = await axios.get("/user/mypage");
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};
