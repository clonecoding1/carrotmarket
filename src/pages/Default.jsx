import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Default(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const alerts = (text) => {
    Swal.fire({ icon: "error", text: text }).then((result) => {
      if (result.isConfirmed || result.isDismissed)
        navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      alerts("로그아웃 후 이용해주세요");
    } else {
      alerts("로그인 후 이용해주세요");
    }
  }, []);
  return <div></div>;
}

export default Default;
