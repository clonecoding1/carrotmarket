import axios from "../axios/axios";
export const addPost = async (data) => {
  let answer = { result: null };
  try {
    const res = await axios.post("/post", data);
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};
