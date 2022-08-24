import React, { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";

function Kakao(props) {
  const socialLoginSuccess = (res) => {
    const user = {
      email: res.profile.kakao_account.email,
      nickname: res.profile.properties.nickname,
      location: "수도권",
      profile: res.profile.properties.profile_image,
    };
    console.log(user);
    console.log(res);

    // axios.post(process.env.REACT_APP_ENDPOINT,{user}).then((res) => {
    //   console.log(res)
    // })
  };

  const socialLoginFail = (res) => {
    console.log("실패", res);
  };

  useEffect(() => {
    window.Kakao.init("1a9ee1ea3e720eb495d2873df8c6923f");
  }, []);

  return (
    <StButon>
      <KakaoLogin
        style={{}}
        jskey="1a9ee1ea3e720eb495d2873df8c6923f"
        onSuccess={(res) => socialLoginSuccess(res)}
        onFail={(res) => socialLoginFail(res)}
        getProfile={true}
      >
        <img src="https://online.spartacodingclub.kr/static/media/ic_kko.e96d6941.svg" alt="" />
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
