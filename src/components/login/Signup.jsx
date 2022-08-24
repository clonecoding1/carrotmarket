import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { postSignup, dupNickname, dupEmail } from "../../api/loginAPI";

const Signup = ({ goSignin }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();
  const [dupEmailText, setDupEmailText] = useState(false);
  const [dupEmailCurrent, setDupEmailCurrent] = useState("");
  const [dupNicknameText, setDupNicknameText] = useState(false);
  const [dupNicknameCurrent, setDupNicknameCurrent] = useState("");
  const [profile, setProfile] = useState(
    "user-img%2Fdefault.jpg?alt=media&token=f6879015-04b7-46b8-98c8-65a0edec861a"
  );
  const email = useRef();
  const password = useRef();
  const nickname = useRef();
  email.current = watch("email");
  password.current = watch("password");
  nickname.current = watch("nickname");

  const swalert = (icon, text) => {
    Swal.fire({ icon, text });
  };

  //회원가입
  const onSubmit = (data, e) => {
    if (dupEmailText === false) {
      swalert("error", "이메일 중복검사를 다시 확인해주세요");
      return;
    }
    if (dupNicknameText === false) {
      swalert("error", "닉네임 중복검사를 다시 확인해주세요");
      return;
    }
    postSignup({ ...data, profile }).then((res) => {
      console.log(res);
      if (res.result) {
        swalert("success", "회원가입이 완료되었습니다.");
        goSignin();
        e.target.reset();
      } else {
        swalert("error", res.res.data);
      }
    });
  };

  //이메일 수정할때 다시 false로 돌림
  useEffect(() => {
    if (dupEmailCurrent !== email.current) {
      setDupEmailText(false);
    }
  }, [email.current]);

  //닉네임 수정할때 다시 false로 돌림
  useEffect(() => {
    if (dupNicknameCurrent !== nickname.current) {
      setDupNicknameText(false);
    }
  }, [nickname.current]);

  //이메일 중복검사
  const onDupEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email.current)) {
      dupEmail({ email: email.current }).then((res) => {
        if (res.result) {
          setDupEmailText(true);
          setDupEmailCurrent(email.current);
          swalert("success", "사용 가능한 이메일입니다.");
        } else {
          swalert("error", res.res.data);
        }
      });
    } else {
      swalert("error", "이메일 형식에 맞지 않습니다.");
    }
  };

  //이메일 중복검사
  const onDupNickname = () => {
    if (nickname.current.length < 2 || nickname.current.length > 10) {
      swalert("error", "닉네임은 2자리 이상 10자리 이하로 입력해주세요.");
    } else {
      dupNickname({ nickname: nickname.current }).then((res) => {
        if (res.result) {
          setDupNicknameText(true);
          setDupNicknameCurrent(nickname.current.length);
          swalert("success", "사용 가능한 닉네임입니다.");
        } else {
          swalert("error", res.res.data);
        }
      });
    }
  };

  return (
    <StSignup>
      <div>
        <h2>
          안녕하세요!
          <br />
          이메일로 가입 해주세요.
        </h2>
        <p>이메일은 안전하게 보관되며 이웃들에게 공개되지 않아요</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StInputWrapper>
            <input
              onChange={() => {
                setDupEmailText(false);
              }}
              ref={email}
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
            <button onClick={onDupEmail} type={"button"}>
              중복체크
            </button>
            {errors.email && errors.email.type === "required" && (
              <p className={"warning"}>이메일은 필수 입력사항입니다</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className={"warning"}>이메일 형식에 맞지 않습니다</p>
            )}
          </StInputWrapper>
          <StInputWrapper>
            <input
              onChange={() => {
                setDupNicknameText(false);
              }}
              ref={nickname}
              type="text"
              placeholder="닉네임"
              autoComplete="off"
              {...register("nickname", {
                required: true,
                minLength: {
                  value: 2,
                  message: "2자리 이상 10자리 이하로 입력해주세요",
                },
                maxLength: {
                  value: 10,
                  message: "2자리 이상 10자리 이하로 입력해주세요",
                },
              })}
            />
            <button onClick={onDupNickname} type={"button"}>
              중복체크
            </button>
            {errors.nickname && errors.nickname.type === "required" && (
              <p className={"warning"}>닉네임은 필수 입력사항 입니다.</p>
            )}
            {errors.nickname && errors.nickname.type === "minLength" && (
              <p className={"warning"}>{errors.nickname.message}</p>
            )}
            {errors.nickname && errors.nickname.type === "maxLength" && (
              <p className={"warning"}>{errors.nickname.message}</p>
            )}
          </StInputWrapper>
          <StInputWrapper>
            <input
              ref={password}
              type="password"
              placeholder="비밀번호"
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
          <StInputWrapper>
            <input
              type="password"
              placeholder="비밀번호 재확인"
              autoComplete="off"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password.current,
              })}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <p className={"warning"}>
                  재확인 비밀번호는 필수 입력사항 입니다.
                </p>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <p className={"warning"}>비밀번호가 일치하지 않습니다.</p>
              )}
          </StInputWrapper>
          <StInputWrapper>
            <select {...register("location")}>
              <option disabled>지역을 선택해 주세요</option>
              <option value="수도권">수도권</option>
              <option value="경상도">경상도</option>
              <option value="전라도">전라도</option>
              <option value="강원도">강원도</option>
              <option value="충청도">충청도</option>
            </select>
          </StInputWrapper>
          <StButtonWrapper>
            <StGoLoginButton
              type={"button"}
              onClick={() => {
                reset();
                goSignin();
              }}
            >
              <span>로그인</span>
            </StGoLoginButton>
            <StSignupButton type={"submit"} disabled={isSubmitting}>
              <span>회원가입</span>
            </StSignupButton>
          </StButtonWrapper>
        </form>
      </div>
    </StSignup>
  );
};
export default Signup;

const StSignup = styled.div`
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
  align-items: center;
  margin-bottom: 1rem;
  position: relative;

  & input {
    flex: 1;
    margin: 1rem 0;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #c9c9c9;
  }

  & button {
    width: 10rem;
    margin-left: 1rem;
    height: 5.1rem;
    border-radius: 10px;
    border: none;
  }

  & select {
    width: 100%;
    border: 1px solid #c9c9c9;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
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
`;

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
`;

const StGoLoginButton = styled.button`
  border-radius: 10px;
  margin: 1rem 1rem 1rem 0;
  padding: 2rem;
  width: 35%;
  background-color: #ffd9c4;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  color: #ff7733;
`;
