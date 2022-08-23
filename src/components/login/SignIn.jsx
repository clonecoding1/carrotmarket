import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postLogin } from "../../api/loginAPI";
import { setCookie } from "../../utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/modules/tokenSlice";

const SignIn = ({ goSignup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Kakao } = window;
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

  const { userToken } = useSelector((state) => state.tokenSlice);

  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그아웃 후 이용해주세요" }).then(
      (res) => {
        navigate("/", { replace: true });
      }
    );
  };
  const cannotLogin = () => {
    Swal.fire({ icon: "error", text: "로그인에 실패하였습니다" });
  };

  useEffect(() => {
    if (userToken !== null) {
      alerts();
      return;
    }
  }, []);

  const onSubmit = (data) => {
    postLogin(data).then((res) => {
      if (res.result) {
        setCookie("token", res.res);
        dispatch(logIn());
        navigate("/", { replace: true });
      } else {
        cannotLogin();
      }
    });
  };

  const onKakaoLoginHandler = () => {
    Kakao.Auth.login({
      success: (authObj) => {
        fetch(`cd45fb1f4304e84a2ef625f48b525d77`, {
          method: "POST",
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          });
      },
    });
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
            {errors.email && errors.email.type === "required" && (
              <p className={"warning"}>이메일은 필수 입력사항입니다</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className={"warning"}>이메일 형식에 맞지 않습니다</p>
            )}
          </StInputWrapper>
          <StInputWrapper>
            <input
              type="password"
              placeholder="****************"
              autoComplete="off"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요",
                },
                pattern: {
                  value:
                    /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                  message:
                    "비밀번호는 문자, 숫자, 특수문자 각 1개씩 포함하며 8글자 이상입니다",
                },
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className={"warning"}>비밀번호는 필수 입력사항 입니다</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className={"warning"}>{errors.password.message}</p>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <p className={"warning"}>{errors.password.message}</p>
            )}
          </StInputWrapper>
          <StButtonWrapper>
            <StButton type="button" onClick={onKakaoLoginHandler}>
              KaKao 로그인
            </StButton>
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
  margin-top: 2rem;
`;

const StButton = styled.button`
  width: 50%;
  margin: 1rem 0;
  padding: 1.5rem;
  border: none;
  font-size: 1.8rem;
  background-color: #fda473;
  color: #ffffff;
  border-radius: 10px;
  background-image: url("https://download-hub.com/wp-content/uploads/2021/02/Daangn.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left 10% center;

  &[type="button"] {
    margin-right: 1rem;
    background-image: url("https://online.spartacodingclub.kr/static/media/ic_kko.e96d6941.svg");
    color: black;
    background-color: #ffe500;
  }
`;

const StSignupButton = styled.button`
  border-radius: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 2rem;
  width: 100%;
  background-color: #fda473;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  color: white;

  & span {
    font-weight: bold;
    margin-left: 1rem;
    font-size: 1.8rem;
    color: white;
  }
`;
