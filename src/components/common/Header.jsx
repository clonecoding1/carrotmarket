import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const Header = () => {
  const [login, setLogin] = useState(false);

  return (
    <StHeader>
      {login ? (
        <UserLocationInfo className="fcc">
          수도권
          <IoIosArrowDown style={{ marginLeft: ".2rem" }} />
        </UserLocationInfo>
      ) : (
        <LogoImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/DaangnMarket_logo.png/800px-DaangnMarket_logo.png" />
      )}
      <SearchInput type="search" placeholder="검색창" />
      <Btn onClick={login ? null : null}>Log{login ? "out" : "in"}</Btn>
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
  background: rgba(0, 0, 0, 0.1);
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
