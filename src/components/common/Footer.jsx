import styled from "styled-components";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import {
  IoPerson,
  IoPersonOutline,
  IoChatbubblesSharp,
  IoChatbubblesOutline,
} from "react-icons/io5";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Footer = () => {
  const nav = useNavigate();
  const { isLogin } = useSelector((state) => state.tokenSlice);
  const pathname = useLocation().pathname;

  const alerts = () => {
    Swal.fire({
      title: "로그인이 필요한 기능입니다",
      text: "로그인 페이지로 이동하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then((res) => {
      if (res.isConfirmed) {
        nav("/login");
      }
    });
  };

  return (
    <StFooter>
      <FooterNav>
        <li
          onClick={() => {
            nav("/");
          }}
        >
          {pathname === "/" ? <RiHome2Fill /> : <RiHome2Line />}
          <p>홈</p>
        </li>
        <li onClick={() => nav("/chatList")}>
          {pathname === "/chatList" ? (
            <IoChatbubblesSharp />
          ) : (
            <IoChatbubblesOutline />
          )}
          <p>채팅</p>
        </li>
        <li
          onClick={
            isLogin
              ? () => {
                  nav("/mypage");
                }
              : () => {
                  alerts();
                }
          }
        >
          {pathname === "/mypage" ? <IoPerson /> : <IoPersonOutline />}
          <p>나의 당근</p>
        </li>
      </FooterNav>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  min-height: 8rem;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 -0.3rem 0.3rem -0.3rem;
`;

const FooterNav = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 4rem;

  li {
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  li:hover {
    cursor: pointer;
    color: rgb(255, 138, 61);
  }

  p {
    font-size: 1.5rem;
  }
`;
