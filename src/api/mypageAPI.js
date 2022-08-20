import axios from "../axios/axios";

export const getUser = async () => {
  const answer = {result:null}
  try {
    const res = await axios.get("/users")
    answer.res = res.data
    answer.result = true
  }catch (err) {
    console.log(err)
    answer.result= false
  }
  return answer
}