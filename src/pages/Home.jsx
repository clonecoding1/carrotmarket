import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Home = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://localhost:5000/post");
      setPostList(res.data);
    };
    getPosts();
  }, []);
  console.log(postList);
  return (
    <StContainer>
      {postList.map((post) => {
        return (
          <StCard key={post.id}>
            <StImg>
              <img src={post.img} />
            </StImg>
            <StComment>
              <span>{post.title}</span>
              <span>{post.nickname}</span>
              <span>{post.price}원</span>
              <span>{post.location}</span>
              <span style={{ textAlign: "right" }}>♡{post.likeCount}</span>
            </StComment>
          </StCard>
        );
      })}
    </StContainer>
  );
};

export default Home;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StCard = styled.div`
  display: flex;

  height: 200px;
  border-bottom: 1px solid red;
`;
const StImg = styled.div`
  width: 200px;
  height: 200px;
  background-size: cover;

  & img {
    width: 200px;
    height: 200px;
  }
`;
const StComment = styled.div`
  font-size: large;
  display: flex;
  width: 350px;
  flex-direction: column;
  & span {
    padding: 5px;
    padding-left: 20px;
  }
`;
