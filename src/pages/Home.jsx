import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "../axios/axios";
import Pagination from "../components/Pagination";
import { getTimeString } from "../utils/timeString";

const Home = () => {
  const nav = useNavigate();
  const [postList, setPostList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/post");
      setPostList(res.data.allPost.Posts);
    };
    getPosts();
  }, []);

  return (
    <div style={{ position: "relative", height: "100%", padding: "2rem" }}>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </label>
      <StContainer>
        {postList.slice(offset, offset + limit).map((post) => {
          const repImg = post.img.split(",")[0];
          const createDate = getTimeString(new Date(post.createdAt));
          console.log(post.likeCount);
          return (
            <StCard key={post.postId} onClick={() => nav(`/detail/${post.postId}`)}>
              {/* <StCard key={post.postId} onClick={() => {}}> */}
              <StImg src={process.env.REACT_APP_IMGURL + repImg} alt="사진을 로딩중입니다." />
              <StComment>
                <div className="title">{post.title}</div>
                <div className="createDate">{createDate}</div>
                <div className="price">{post.price}원</div>
                {post.likeCount && post.likeCount !== 0 && (
                  <div className="heart">
                    <AiOutlineHeart />
                    {post.likeCount}
                  </div>
                )}
              </StComment>
            </StCard>
          );
        })}
        <div style={{ position: "absolute", width: "100%", bottom: "-8rem" }}>
          <Pagination total={postList.length} limit={limit} page={page} setPage={setPage} />
        </div>
      </StContainer>
      <AddBtn
        className="fcc"
        onClick={() => {
          nav("/write");
        }}
      >
        <AiOutlinePlus />
      </AddBtn>
    </div>
  );
};

export default Home;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StCard = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1.5rem 0;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 1rem;
  margin-right: 2rem;
`;
const StComment = styled.div`
  flex: 1;
  position: relative;
  font-size: 2rem;
  * {
    margin-bottom: 0.3rem;
  }
  .createDate,
  .price {
    font-size: 1.5rem;
  }
  .createDate {
    color: gray;
  }
  .price {
    font-weight: bold;
  }
  .heart {
    position: absolute;
    bottom: 0;
    right: 1rem;
  }
`;

const AddBtn = styled.button`
  position: sticky;
  bottom: 5rem;
  margin-left: calc(100% - 13rem);
  border-radius: 50%;
  border: 1px solid rgb(255, 138, 61);
  background-color: rgb(255, 138, 61);

  width: 8rem;
  height: 8rem;

  font-size: 5rem;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: white;
    color: rgb(255, 138, 61);
  }
`;
