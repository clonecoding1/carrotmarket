import React, { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";
import { kakaoLogin } from "../api/kakaoLoginAPI";
import { setCookie } from "../utils/cookie";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/modules/tokenSlice";
import { useNavigate } from "react-router-dom";

function Kakao(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socialLoginSuccess = (res) => {
    const user = {
      email: res.profile.kakao_account.email,
      nickname: res.profile.properties.nickname,
      location: "수도권",
      profile: res.profile.properties.thumbnail_image,
    };
    kakaoLogin(user).then((res) => {
      if (res.result) {
        setCookie("token", res.token);
        dispatch(logIn());
        navigate("/", { replace: true });
      } else {
        alert("로그인 실패");
      }
    });

    // axios.post(process.env.REACT_APP_ENDPOINT,{user}).then((res) => {
    //   console.log(res)
    // })
  };

  const socialLoginFail = (res) => {
    console.log("실패", res);
  };

  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAOAPIKEY);
  }, []);

  return (
    <StButon>
      <KakaoLogin
        style={{}}
        jskey={process.env.REACT_APP_KAKAOJSKEY}
        onSuccess={(res) => socialLoginSuccess(res)}
        onFail={(res) => socialLoginFail(res)}
        getProfile={true}
      >
        <img
          src="https://online.spartacodingclub.kr/static/media/ic_kko.e96d6941.svg"
          alt=""
        />
        카카오 로그인
      </KakaoLogin>
    </StButon>
  );
}

export default Kakao;

const StButon = styled.div`
  width: 50%;
  margin-right: 1rem;
  & button {
    width: 100%;
    margin: 1rem 0;
    padding: 1.5rem;
    border: none;
    font-size: 1.8rem;
    color: #ffffff;
    border-radius: 10px;
    margin-right: 1rem;
    color: black;
    background-color: #ffe500;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
`;
