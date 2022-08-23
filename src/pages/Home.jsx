import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from "../Pagination";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://localhost:5000/post");
      setPostList(res.data);
    };
    getPosts();
  }, []);

  return (
    <>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </label>
      <StContainer>
        {postList.slice(offset, offset + limit).map((post) => {
          return (
            <StCard key={post.id}>
              <StImg>
                <img src={post.img} alt="post" />
              </StImg>
              <StComment>
                <span className="title">{post.title}</span>
                <span className="nickname">{post.nickname}</span>
                <span className="price">
                  {Number(post.price).toLocaleString()}원
                </span>
                <span className="location">{post.location}</span>
                {/* <span style={{ textAlign: "right" }}>♡{post.likeCount}</span> */}
                <div style={{ textAlign: "right" }}>
                  <BsFillEmojiHeartEyesFill />
                  {post.likeCount}
                </div>
              </StComment>
            </StCard>
          );
        })}
      </StContainer>
      <footer>
        <Pagination
          total={postList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </>
  );
};

export default Home;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StCard = styled.div`
  display: flex;
  padding: 1rem;
  height: 200px;
  border-bottom: 1px solid red;
`;
const StImg = styled.div`
  width: 180px;
  height: 180px;
  background-size: cover;

  & img {
    width: 180px;
    height: 180px;
    object-fit: cover;
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
  & .title {
    font-weight: bold;
  }
  & .nickname {
    font-size: small;
    color: #868383;
  }
  & .price {
    font-weight: bold;
  }
  & .location {
    font-size: medium;
    color: #3a3939;
  }
`;
