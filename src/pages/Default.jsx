import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Default(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const needLogoutAlert = (text) => {
    Swal.fire({ icon: "error", text: text }).then((result) => {
      if (result.isConfirmed || result.isDismissed) navigate("/", { replace: true });
    });
  };

  const needLoginAlert = () => {
    Swal.fire({
      title: "로그인이 필요한 기능입니다",
      text: "로그인 페이지로 이동하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/login");
      } else {
        navigate(-1);
      }
    });
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      needLogoutAlert("로그아웃 후 이용해주세요");
    } else {
      needLoginAlert();
    }
  }, []);
  return <div></div>;
}

export default Default;
