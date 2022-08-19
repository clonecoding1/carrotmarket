import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import axios from "axios";

const Signup = ({goSignin}) => {
  const {register,watch, handleSubmit,reset, formState:{isSubmitting, errors}} = useForm();
  const password = useRef()
  password.current = watch("password")


  const onSubmit = (data, e) =>{
    try {
      axios.post("http://localhost:4000/register", data)
        .then((res)=> {
          alert("회원가입 되었습니다.")
          goSignin()
          e.target.reset()
        }).catch((rej)=> {
        if(rej.response.status===401) {
          return alert("이미 로그인 되어 있습니다.")
        }else if(rej.response.status===400) {
          return alert("씨발왜안됌")
        }})
    }catch (err) {
      console.log(err)
    }

  }



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
        <form onSubmit={handleSubmit(onSubmit)}>
          <StInputWrapper>
            <input
              type="text"
              placeholder="test@email.com"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <button type={"button"}>
              중복체크
            </button>
            {errors.email && errors.email.type ==="required" && <p className={"warning"}>이메일은 필수 입력사항입니다</p>}
            {errors.email && errors.email.type ==="pattern" && <p className={"warning"}>이메일 형식에 맞지 않습니다</p>}
          </StInputWrapper>
          <StInputWrapper>
            <input
              type="text"
              placeholder="닉네임"
              {...register("nickname", {
                required:true,
                minLength: {
                  value:2,
                  message:"2자리 이상 10자리 이하로 입력해주세요"
                },
                maxLength:{
                  value:10,
                  message:"2자리 이상 10자리 이하로 입력해주세요"
                }
              })}
            />
            <button type={"button"}>
              중복체크
            </button>
            {errors.nickname && errors.nickname.type ==="required" && <p className={"warning"}>닉네임은 필수 입력사항 입니다.</p>}
            {errors.nickname && errors.nickname.type ==="minLength" && <p className={"warning"}>{errors.nickname.message}</p>}
            {errors.nickname && errors.nickname.type ==="maxLength" && <p className={"warning"}>{errors.nickname.message}</p>}
          </StInputWrapper>
          <StInputWrapper>
            <input
              ref={password}
              type="password"
              placeholder="****************"
              {...register("password", {
                required:true,
                minLength: {
                  value:8,
                  message:"8자리 이상 비밀번호를 사용하세요"
                },
                pattern: {
                  value: /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message:"비밀번호는 문자, 숫자, 특수문자 각 1개씩 포함하며 8글자 이상입니다"
                },
              })}
            />
            {errors.password && errors.password.type ==="required" && <p className={"warning"}>비밀번호는 필수 입력사항 입니다</p>}
            {errors.password && errors.password.type ==="minLength" && <p className={"warning"}>{errors.password.message}</p>}
            {errors.password && errors.password.type ==="pattern" && <p className={"warning"}>{errors.password.message}</p>}
          </StInputWrapper>
          <StInputWrapper>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              {...register("confirmPassword", {
                required:true,
                validate: (value) => value === password.current

              })}
            />
            {errors.confirmPassword && errors.confirmPassword.type ==="required" && <p className={"warning"}>재확인 비밀번호는 필수 입력사항 입니다.</p>}
            {errors.confirmPassword && errors.confirmPassword.type ==="validate" && <p className={"warning"}>비밀번호가 일치하지 않습니다.</p>}
          </StInputWrapper>
          <StButtonWrapper>
            <StGoLoginButton type={"button"} onClick={goSignin}>
              <span>로그인</span>
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
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  
  & input {
    flex: 1;
    margin: 1rem 0;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #c9c9c9;
  }
  
  & button {
    width: 100px;
    margin-left: 1rem;
    height: 5.1rem;
    border-radius: 10px;
    border: none;
  }
  
  & .warning {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: red;
    font-weight: 700;
    font-size: 1.4rem;
  }
`

const StButtonWrapper = styled.div`
  display: flex;

`

const StSignupButton = styled.button`
  border-radius: 10px;
  margin: 1rem 0;
  padding: 2rem;
  width: 65%;
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
  width: 35%;
  background-color: #ffd9c4;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  color: #ff7733;
`
