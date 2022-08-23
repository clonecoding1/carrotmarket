import React from "react";
import ChatUser from "../components/chatList/ChatUser";

const ChatList = () => {
  const dummy = {
    userId: 1,
    nickname: "당근이",
    profile: "logo.png?alt=media&token=fb0a9820-20b9-475c-ba2f-3950d39b163e",
    chat: "동네이웃님 반갑습니당!",
  };
  return (
    <>
      <ChatUser user={dummy}></ChatUser>
    </>
  );
};

export default ChatList;
