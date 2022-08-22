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
                <span>{post.title}</span>
                <span>{post.nickname}</span>
                <span>{post.price}원</span>
                <span>{post.location}</span>
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
