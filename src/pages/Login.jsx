import Signup from "../components/login/Signup";
import SignIn from "../components/login/SignIn";
import {Fragment, useRef} from "react";
import styled from "styled-components";

const Login = () => {
  const LyLogin = useRef()
  const LySignup = useRef()

  const goSignup = () => {
    LyLogin.current.style.left = "-100%"
    LyLogin.current.style.opacity = "0"
    LySignup.current.style.left = "0"
    LySignup.current.style.opacity = "1"
  }

  const goSignin = () => {
    LyLogin.current.style.left = "0"
    LyLogin.current.style.opacity = "1"
    LySignup.current.style.left = "100%"
    LySignup.current.style.opacity = "0"
  }
  return (
    <StLogin>
      <StSignInWrapper ref={LyLogin}>
        <SignIn goSignup={goSignup}/>
      </StSignInWrapper>
      <StSignUpWrapper ref={LySignup}>
        <Signup goSignin={goSignin}/>
      </StSignUpWrapper>
    </StLogin>
  )
}

export default Login
// 메인컬러 background-color: #ff7e36;

const StLogin = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const StSignInWrapper = styled.div`
  position: relative;
  left: 0;
  height: 100%;
  padding: 0 20px;
  transition: 0.5s ease-in-out;
  opacity: 1;
  overflow: auto;
`

const StSignUpWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  transition: 0.5s ease-in-out;
  opacity: 0;
  overflow: auto;
`


