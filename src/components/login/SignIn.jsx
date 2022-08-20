import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { postLogin } from "../../api/loginAPI";
import { getCookie, setCookie } from "../../utils/cookie";

const SignIn = ({ goSignup }) => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const email = useRef();
  const password = useRef();
  email.current = watch("email");
  password.current = watch("password");

  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그아웃 후 이용해주세요" }).then((res) => {
      navigate("/", { replace: true });
    });
  };

  if (getCookie("token")) {
    alerts();
    return;
  }
  const onSubmit = (data) => {
    try {
      postLogin(data)
        .then((res) => {
          setCookie("token", res.data.accessToken);
          navigate("/", { replace: true });
        })
        .catch((rej) => {
          console.log(rej);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StSignIn>
      <div>
        <h2>
          안녕하세요!
          <br />
          이메일로 로그인 해주세요.
        </h2>
        <p>이메일은 안전하게 보관되며 이웃들에게 공개되지 않아요</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StInputWrapper>
            <input
              type="text"
              placeholder="test@email.com"
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.email && errors.email.type === "required" && <p className={"warning"}>이메일은 필수 입력사항입니다</p>}
            {errors.email && errors.email.type === "pattern" && <p className={"warning"}>이메일 형식에 맞지 않습니다</p>}
          </StInputWrapper>
          <StInputWrapper>
            <input
              type="password"
              placeholder="****************"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요",
                },
                pattern: {
                  value: /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message: "비밀번호는 문자, 숫자, 특수문자 각 1개씩 포함하며 8글자 이상입니다",
                },
              })}
            />
            {errors.password && errors.password.type === "required" && <p className={"warning"}>비밀번호는 필수 입력사항 입니다</p>}
            {errors.password && errors.password.type === "minLength" && <p className={"warning"}>{errors.password.message}</p>}
            {errors.password && errors.password.type === "pattern" && <p className={"warning"}>{errors.password.message}</p>}
          </StInputWrapper>
          <StButtonWrapper>
            <StButton type="submit" disabled={isSubmitting}>
              로그인
            </StButton>
          </StButtonWrapper>
        </form>
      </div>
      <div className={"buttonWrapper"}>
        <StSignupButton onClick={goSignup}>
          계정이 없으신가요? <span>회원가입</span>
        </StSignupButton>
      </div>
    </StSignIn>
  );
};
export default SignIn;

const StSignIn = styled.div`
  height: 100%;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;

  & h2 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 2.2rem;
  }

  & p {
    font-size: 1.6rem;
  }

  & form {
    width: 100%;
  }
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;

  & input {
    margin: 1rem 0;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #c9c9c9;
  }

  & .warning {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: #ff7c7c;
    font-weight: 700;
    font-size: 1.4rem;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StButton = styled.button`
  width: 35%;
  margin: 1rem 0;
  padding: 1.5rem;
  border: none;
  font-size: 18px;
  background-color: #ff7e36;
  color: #ffffff;
  border-radius: 10px;
`;

const StSignupButton = styled.button`
  border-radius: 1rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
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
`;
