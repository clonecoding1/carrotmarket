import Home from "../pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import Example from "../pages/Example";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Mypage from "../pages/Mypage";
import Kakao from "./../pages/Kakao";
import Detail from "../pages/Detail";
import ChatList from "../pages/ChatList";
import Chatting from "../pages/Chatting";

const Router = () => {
  // 나중에 로그인 유무에 따른 alert를 여기서 전부 처리하기
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/write" element={<Write />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/oauth" element={<Kakao />} />
      <Route path="/detail/:postId" element={<Detail />} />
      <Route path="/chatlist" element={<ChatList />} />
      <Route path="/chatting/:userId" element={<Chatting />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
