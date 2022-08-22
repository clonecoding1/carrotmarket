import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  const [login, setLogin] = useState(false);

  const pathnameByTitle = {
    "/login": "로그인",
    "/write": "중고거래 글쓰기",
  };

  return (
    <StHeader>
      {pathname === "/" && (
        <>
          {login ? (
            <UserLocationInfo className="fcc">
              수도권
              <IoIosArrowDown style={{ marginLeft: ".2rem" }} />
            </UserLocationInfo>
          ) : (
            <LogoImg
              onClick={() => {
                nav("/");
              }}
              src={process.env.REACT_APP_IMGURL + "mentLogo.png?alt=media&token=7fad5613-8280-4dc3-9779-6e791b924fe9"}
            />
          )}
          <SearchInput type="search" placeholder="검색창" />
          <Btn
            onClick={
              login
                ? null
                : () => {
                    nav("/login");
                  }
            }
          >
            Log{login ? "out" : "in"}
          </Btn>
        </>
      )}
      {pathname !== "/" && (
        <HeaderLeft className="fcc">
          <GobackBtn
            onClick={() => {
              nav(-1);
            }}
            className="fcc"
          >
            <IoIosArrowBack />
          </GobackBtn>
          {pathnameByTitle[pathname]}
        </HeaderLeft>
      )}
      {pathname === "/write" && (
        <SubmitBnt htmlFor="submitBtn" className="fcc">
          완료
        </SubmitBnt>
      )}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  height: 8rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.3rem 0.3rem -0.3rem;
`;

const LogoImg = styled.img`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
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

const UserLocationInfo = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  width: 5rem;
  height: 5rem;
`;

const SearchInput = styled.input`
  height: 3rem;
  padding: 0 0.5rem;
  background: #dadada;
  border: 0;
  border-radius: 0.5rem;
  &:focus {
    outline: 2px solid rgb(255, 138, 61);
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    background: url("https://cdn-icons-png.flaticon.com/512/70/70287.png") center center no-repeat;
    background-size: 1rem;
    cursor: pointer;
  }
`;

// write 페이지용

const SubmitBnt = styled.label`
  cursor: pointer;
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

const HeaderLeft = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

const GobackBtn = styled.div`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
`;
