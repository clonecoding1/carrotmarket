import styled from "styled-components";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import { IoPerson, IoPersonOutline, IoChatbubblesSharp, IoChatbubblesOutline } from "react-icons/io5";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState(false);
  const pathname = useLocation().pathname;
  return (
    <StFooter>
      <FooterNav>
        <li onClick={() => nav("/")}>
          {pathname === "/" ? <RiHome2Fill /> : <RiHome2Line />}
          <p>홈</p>
        </li>
        <li onClick={() => nav("/write")}>
          <IoChatbubblesOutline />
          <p>채팅</p>
        </li>
        <li>
          {pathname === "/mypage" ? <IoPerson /> : <IoPersonOutline />}
          <p>나의 당근</p>
        </li>
      </FooterNav>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  height: 8rem;
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
