import axios from "../axios/axios";

export const addPost = async (data) => {
  let answer = { result: null };
  try {
    const res = await axios.post("/post", data);
    answer.message = res.data.data;
    answer.result = true;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};

export const getPostOne = async (postId) => {
  let answer = { result: null };
  try {
    const res = await axios.get(`/post/${postId}`);
    answer.post = res.data.data;
    answer.result = true;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};

export const deletePost = async (postId) => {
  let answer = { result: null };
  try {
    const res = await axios.get(`/post/${postId}`);
    console.log(res);
    answer.result = true;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
