import axios from "../axios/axios";

export const getUser = async () => {
  const answer = { result: null };
  try {
    const res = await axios.get("/user/mypage");
    console.log(res);
    answer.res = res.data;
    answer.result = true;
  } catch (err) {
    console.log(err);
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
    console.log(err);
    answer.result = false;
  }
  return answer;
};
