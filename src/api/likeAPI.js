import axios from "../axios/axios";

export const addnRemoveLike = async (postId) => {
  const answer = { result: null };
  try {
    await axios.post(`/user/like/${postId}`);
    answer.result = true;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
