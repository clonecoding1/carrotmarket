import Signup from "../components/login/Signup";
import SignIn from "../components/login/SignIn";
import {useEffect} from "react";
import styled from "styled-components";

const Login = () => {
  let loginPage,signUpPage
  useEffect(()=> {
    loginPage = document.querySelector(".SignInWrapper")
    signUpPage = document.querySelector(".SignUpWrapper")
  },[])

  const goSignup = () => {
    loginPage.classList.toggle("active")
    signUpPage.classList.toggle("active")
  }

  const goSignin = () => {
    loginPage.classList.toggle("active")
    signUpPage.classList.toggle("active")
  }
  return (
    <StLogin>
      <div className={"SignInWrapper"}>
        <SignIn goSignup={goSignup}/>
      </div>
      <div className={"SignUpWrapper"}>
        <Signup goSignin={goSignin}/>
      </div>
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


