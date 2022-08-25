import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Mypage from "../pages/Mypage";
import Kakao from "./../pages/Kakao";
import Detail from "../pages/Detail";
import ChatList from "../pages/ChatList";
import Default from "../pages/Default";

const Router = () => {
  const { isLogin } = useSelector((state) => state.tokenSlice);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/write" element={isLogin ? <Write /> : <Default />} />
      <Route path="/mypage" element={isLogin ? <Mypage /> : <Default />} />
      <Route path="/oauth" element={<Kakao />} />
      <Route path="/detail/:postId" element={<Detail />} />
      <Route path="/chatlist" element={isLogin ? <ChatList /> : <Default />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
