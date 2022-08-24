import axios from "../axios/axios";

export const addnRemoveLike = async (postId) => {
  const answer = { result: null };
  try {
    const res = await axios.post(`/user/like/${postId}`);
    answer.result = true;
    answer.message = res.data;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
