import axios from "../axios/axios";

export const getUser = async () => {
  const answer = { result: null };
  try {
    const respond = await axios.get("/users?id=19");
    answer.respond = respond.data;
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
    const res = await axios.delete("/users/mypage");
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};
