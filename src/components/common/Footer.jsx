import styled from "styled-components";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import { IoPerson, IoPersonOutline, IoChatbubblesSharp, IoChatbubblesOutline } from "react-icons/io5";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState(false);
  return (
    <StFooter>
      {login ? (
        <FooterNav>
          <li>
            <RiHome2Fill />
            <p>홈</p>
          </li>
          <li>
            <IoChatbubblesOutline />
            <p>채팅</p>
          </li>
          <li>
            <IoPersonOutline />
            <p>나의 당근</p>
          </li>
        </FooterNav>
      ) : (
        <SignUpArea className="fcc" style={{ flexFlow: "column" }}>
          <button
            onClick={() => {
              nav("/write");
            }}
          >
            게시글 이동
          </button>
          {/* <p>아직 회원이 아니신가요?</p> */}
          <Btn>회원가입</Btn>
        </SignUpArea>
      )}
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

const SignUpArea = styled.div`
  & > p {
    opacity: 0.5;
    font-size: 1.5rem;
  }
  & > :first-child {
    margin-bottom: 1rem;
  }
`;

const Btn = styled.button`
  width: 10rem;
  height: 3.5rem;
  background: rgb(255, 138, 61);

  border: 1px solid rgb(255, 138, 61);
  border-radius: 2.5rem;

  color: white;
  font-size: 1.7rem;

  &:hover {
    background: white;
    color: rgb(255, 138, 61);
  }
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
