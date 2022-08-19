import styled from "styled-components";
import {useForm} from "react-hook-form";

const Signup = ({goSignin}) => {

  const {register, handleSubmit, formState:{isSubmitting}} = useForm();
  return (
    <StSignup>
      <div>
        <h2>
          안녕하세요!<br/>
          이메일로 가입 해주세요.
        </h2>
        <p>
          이메일은 안전하게 보관되며 이웃들에게 공개되지 않아요
        </p>
        <form onSubmit={handleSubmit( async (data) =>{
          await new Promise((res)=> setTimeout(res,1000))
          alert(JSON.stringify(data))
        })}>
          <StInputWrapper>
            <input
              id="email"
              type="email"
              placeholder="test@email.com"
              {...register("email")}
            />
          </StInputWrapper>
          <StInputWrapper>
            <input
              id="password"
              type="password"
              placeholder="****************"
              {...register("password")}
            />
          </StInputWrapper>
          <StInputWrapper>
            <input
              id="confirmPassword"
              type="password"
              placeholder="****************"
            />
          </StInputWrapper>
          <StInputWrapper>
            <input
              id="nickname"
              type="text"
              placeholder="홍길동"
            />
          </StInputWrapper>
          <StButtonWrapper>
            <StGoLoginButton type={"button"} onClick={goSignin}>
              <span>로그인 화면으로 가기</span>
            </StGoLoginButton>
            <StSignupButton type={"submit"} disabled={isSubmitting}>
              <span>회원가입</span>
            </StSignupButton>
          </StButtonWrapper>
        </form>
      </div>
    </StSignup>
  )
}
export default Signup

const StSignup = styled.div`
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

const StGoLoginButton = styled.button`
  border-radius: 10px;
  margin: 1rem 1rem;
  padding: 2rem;
  width: 100%;
  background-color: #ffd9c4;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  color: #ff965d;
`
