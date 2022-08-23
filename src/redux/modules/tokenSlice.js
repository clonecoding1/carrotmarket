import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie } from "../../utils/cookie";
import jwtDecode from "jwt-decode";

const initialState = {
  isLogin: false,
  userToken: null,
  user: {
    nickname: null,
    userId: null,
    iat: null,
  },
};
console.log(jwtDecode(getCookie("token")));

// reducer counterSlice
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    logOut: (state, action) => {
      removeCookie("token");
      state.isLogin = false;
      state.userToken = null;
    },
    logIn: (state, action) => {
      state.isLogin = true;
      state.userToken = getCookie("token");
    },
    getUserInfo: (state, action) => {
      state.user = jwtDecode(getCookie("token"));
    },
  },
});

export const { logOut, logIn, getUserInfo } = tokenSlice.actions;
export default tokenSlice.reducer;
