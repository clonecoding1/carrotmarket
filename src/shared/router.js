import { Navigate, Route, Routes } from "react-router-dom";
import Example from "../pages/Example";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Mypage from "../pages/Mypage";
import Kakao from "./../pages/Kakao";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/login" element={<Login />} />
      <Route path="/write" element={<Write />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/kakao" element={<Kakao />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
