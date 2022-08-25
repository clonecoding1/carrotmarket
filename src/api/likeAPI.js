import axios from "../axios/axios";

export const addnRemoveLike = async (postId) => {
  const answer = { result: null };
  try {
    const res = await axios.post(`/user/like/${postId}`);
    answer.message = res.data;
    answer.result = true;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
