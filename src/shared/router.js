import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Mypage from "../pages/Mypage";
import Kakao from "./../pages/Kakao";
import Detail from "../pages/Detail";
import ChatList from "../pages/ChatList";
import Chatting from "../pages/Chatting";

const Router = () => {
  const { isLogin, userToken, user } = useSelector((state) => state.tokenSlice);

  const navigate = useNavigate();
  // 나중에 로그인 유무에 따른 alert를 여기서 전부 처리하기 => 처리할 곳(창순)
  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그인 후 이용해주세요" }).then((result) => {
      if (result.isConfirmed || result.isDismissed) navigate("/", { replace: true });
    });
  };

  // useEffect(() => {
  //   if (isLogin === false) {
  //     alerts();
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isLogin ? <Login /> : <Navigate to={"/"} />} />
      <Route path="/write" element={isLogin ? <Write /> : <Navigate to={"/"} />} />
      <Route path="/mypage" element={isLogin ? <Mypage /> : <Navigate to={"/"} />} />
      <Route path="/oauth" element={<Kakao />} />
      <Route path="/detail/:postId" element={<Detail />} />
      <Route path="/chatlist" element={isLogin ? <ChatList /> : <Navigate to={"/"} />} />
      <Route path="/chatting/:userId" element={isLogin ? <Chatting /> : <Navigate to={"/"} />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
