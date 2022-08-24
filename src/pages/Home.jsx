import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../axios/axios";
import Pagination from "../Pagination";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
    <div style={{ position: "relative", height: "100%" }}>
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
          return (
            <StCard key={post.postId} onClick={() => nav(`/detail/${post.postId}`)}>
              {/* <StCard key={post.postId} onClick={() => {}}> */}
              <StImg>
                <img src={process.env.REACT_APP_IMGURL + post.img.split(",")[0]} alt="post" />
              </StImg>
              <StComment>
                <div className="title">{post.title}</div>
                <div className="nickname">{post.nickname}</div>
                <div className="price">{post.price}원</div>
                <div className="location">{post.location}</div>
                <div style={{ alignSelf: "flex-end" }}>
                  <AiOutlineHeart />
                  {post.likeCount}
                </div>
              </StComment>
            </StCard>
          );
        })}
      </StContainer>
      <footer>
        <Pagination total={postList.length} limit={limit} page={page} setPage={setPage} />
      </footer>
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
`;
const StCard = styled.div`
  cursor: pointer;
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
  display: flex;
  flex-direction: column;
  font-size: large;
  width: 350px;
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

const AddBtn = styled.button`
  position: absolute;
  bottom: 5rem;
  right: 5rem;
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
