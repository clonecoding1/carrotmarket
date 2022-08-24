import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/modules/tokenSlice";
import Swal from "sweetalert2";

const Header = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.tokenSlice);

  const pathnameByTitle = {
    "/login": "로그인",
    "/write": "중고거래 글쓰기",
  };

  const wantLogoutAlert = () => {
    Swal.fire({
      title: "정말 로그아웃 하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "notice",
          title: "로그아웃 하셨습니다.",
          confirmButtonText: "확인",
        }).then(() => {
          dispatch(logOut());
          nav("/login");
        });
      } else {
        Swal.fire({ title: "로그아웃 취소.", confirmButtonText: "확인" });
      }
    });
  };

  return (
    <StHeader>
      {pathname === "/" && (
        <>
          {isLogin ? (
            <UserLocationInfo className="fcc">
              수도권
              <IoIosArrowDown style={{ marginLeft: ".2rem" }} />
            </UserLocationInfo>
          ) : (
            <LogoImg
              onClick={() => {
                nav("/");
              }}
              src={
                process.env.REACT_APP_IMGURL +
                "mentLogo.png?alt=media&token=7fad5613-8280-4dc3-9779-6e791b924fe9"
              }
            />
          )}
          <SearchInput type="search" placeholder="검색창" />
          <Btn
            onClick={
              isLogin
                ? () => {
                    wantLogoutAlert();
                  }
                : () => {
                    nav("/login");
                  }
            }
          >
            Log{isLogin ? "out" : "in"}
          </Btn>
        </>
      )}
      {pathname !== "/" && (
        <HeaderLeft
          className="fcc"
          color={pathname.includes("/detail") ? "rgb(255, 138, 61)" : "black"}
        >
          <GobackBtn
            onClick={() => {
              nav(-1);
            }}
            className="fcc"
          >
            <IoIosArrowBack />
          </GobackBtn>
          {pathnameByTitle[pathname] ? pathnameByTitle[pathname] : "뒤로가기"}
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
  min-height: 8rem;
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
    background: url("https://cdn-icons-png.flaticon.com/512/70/70287.png")
      center center no-repeat;
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
  z-index: 10;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const GobackBtn = styled.div`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
`;
