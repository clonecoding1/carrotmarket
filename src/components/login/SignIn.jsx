import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useRef} from "react";

const SignIn = ({goSignup}) => {

  return (
    <StSignIn>
      <div>
        <h2>
          안녕하세요!<br/>
          이메일로 로그인 해주세요.
        </h2>
        <p>
          이메일은 안전하게 보관되며 이웃들에게 공개되지 않아요
        </p>
        <form>
          <StInputWrapper>
            <input
              id="email"
              type="email"
              placeholder="test@email.com"
            />
          </StInputWrapper>
          <StInputWrapper>
            <input
              id="password"
              type="password"
              placeholder="****************"
            />
          </StInputWrapper>
          <StButtonWrapper>
            <StButton type="submit">로그인</StButton>
          </StButtonWrapper>
        </form>
      </div>
      <StSignupButton onClick={goSignup}>
        계정이 없으신가요? <span>회원가입</span>
      </StSignupButton>
    </StSignIn>
  )
}
export default SignIn

const StSignIn = styled.div`
  height: 100%;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  & h2 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 2.4rem;
  }

  & p {
    font-size: 16px;
  }

  & form {
    width: 100%;
  }
`

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  & input {
    margin: 1rem 0;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #c9c9c9;
  }
`

const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StButton = styled.button`
  width: 35%;
  margin: 1rem 0;
  padding: 1.5rem;
  border: none;
  font-size: 18px;
  background-color: #ff7e36;
  color: #ffffff;
  border-radius: 10px;
`

const StSignupButton = styled.button`
  border-radius: 10px;
  margin: 1rem 0;
  padding: 2rem;
  width: 100%;
  background-color: #ffd9c4;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  color: #ff965d;

  & span {
    font-weight: bold;
    margin-left: 10px;
    font-size: 1.8rem;
    color: #ff7e36;
  }
`