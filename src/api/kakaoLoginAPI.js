import axios from "../axios/axios";

export const kakaoLogin = async (data) => {
  const answer = { result: null };
  try {
    const res = await axios.post("/user/kakao", data);
    answer.token = res.data;
    answer.result = true;
  } catch (err) {
    answer.res = err.response;
    answer.result = false;
  }
  return answer;
};
