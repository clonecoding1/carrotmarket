import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ChatUser = (props) => {
  const nav = useNavigate();
  return (
    <Container className="fcc" onClick={() => nav(`/chatting/${props.user.userId}`)}>
      <img src={process.env.REACT_APP_IMGURL + props.user.profile} />
      <div>
        <p>{props.user.nickname}</p>
        <p>{props.user.chat}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  justify-content: flex-start !important;
  width: 100%;
  height: 10rem;
  padding: 2rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

  font-size: 1.8rem;
  img {
    border-radius: 50%;
    height: 7rem;
    width: 7rem;
  }
  div {
    margin-left: 2rem;
  }
  div > p:first-child {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export default ChatUser;
