import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineHeart } from "react-icons/ai";

import { getPostOne } from "../api/postAPI";
import { getTimeString } from "../utils/timeString";

const Detail = () => {
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPostOne(postId).then((answer) => {
      if (answer.result) {
        const postData = {
          ...answer.post,
          img: answer.post.img.split(","),
          createdAt: getTimeString(answer.post.createdAt),
        };
        setPost(postData);
        setTimeout(setLoading(false), 1000);
      }
    });
  }, []);

  // drag, click 이벤트 분리
  const [dragging, setDragging] = useState(false);
  const [originImg, setOriginImg] = useState(null);
  // 레퍼를 가져와서 쓴거기에 useCallback에 대한 자세한 이해는 안됨
  // 불필요한 렌더링 막기위해 사용한 것으로 추정
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const imgClickHandle = useCallback(
    (e) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }
      setOriginImg(process.env.REACT_APP_IMGURL + e.target.dataset["url"]);
    },
    [dragging]
  );

  const carouselOpt = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  const nav = useNavigate();
  const chatBtnHandler = () => {
    nav("/chatlist");
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <ImgArea>
          <CustomCarouse {...carouselOpt}>
            {post.img &&
              post.img.map((img) => {
                return (
                  <PostImg
                    data-url={img}
                    onClick={imgClickHandle}
                    bgsize={post.img && post.img[0].includes("post-img") ? "cover" : "contain"}
                    key={img}
                  />
                );
              })}
          </CustomCarouse>
        </ImgArea>
        <InfoArea>
          <UserInfo className="fcc">
            <img src={post.profile ? process.env.REACT_APP_IMGURL + post.profile : null} />
            <div>
              <p>{post.nickname}</p>
              <p>{post.location}</p>
            </div>
          </UserInfo>
          <PostInfo>
            <div>{post.title}</div>
            <div>
              {post.createdAt} · 관심 {post.likeCount}
            </div>
            <div>{post.content}</div>
          </PostInfo>
        </InfoArea>
        <ImgModal className="fcc" visible={originImg ? true : false}>
          <CancelBtn onClick={() => setOriginImg(null)}>
            <ImCancelCircle />
          </CancelBtn>
          <img src={originImg} />
        </ImgModal>
        {loading && (
          <LoadingPage>
            <img src={process.env.REACT_APP_IMGURL + "logo.png?alt=media&token=fb0a9820-20b9-475c-ba2f-3950d39b163e"} />
          </LoadingPage>
        )}
      </div>
      <ChatModal className="fcc">
        <div className="fcc">
          <p className="fcc">
            <AiOutlineHeart />
          </p>
          <p>{post.price}원</p>
        </div>
        <Btn onClick={chatBtnHandler}>채팅하기</Btn>
      </ChatModal>
    </>
  );
};

const ImgArea = styled.div`
  position: fixed;
  top: 0;
  width: 60rem;
  height: 35rem;
  background-color: white;
  box-shadow: 0 0.3rem 0.3rem -0.3rem;
`;

const CustomCarouse = styled(Carousel)`
  .slick-dots {
    bottom: 1rem;
  }
  .slick-dots li.slick-active button::before {
    color: white !important;
  }
`;

const PostImg = styled.div`
  width: 60rem;
  height: 35rem;
  background: url(${(props) => (props["data-url"] ? process.env.REACT_APP_IMGURL + props["data-url"] : null)});
  background-size: ${(props) => props.bgsize};
  background-position: center;
  background-repeat: no-repeat;
  background-color: white;
`;

const ImgModal = styled.div`
  position: fixed;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  z-index: ${(props) => (props.visible ? 100 : -1)};
  top: ${(props) => (props.visible ? 0 : "8rem")};
  width: 60rem;
  height: 100%;
  transition-duration: 0.6s;
  background: black;
  & > img {
    width: 100%;
    -webkit-user-drag: none;
  }
`;

const CancelBtn = styled.div`
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  font-size: 5rem;
  color: white;
  top: 1rem;
  left: 1rem;
`;

const InfoArea = styled.div`
  margin-top: 27rem;
  padding: 2rem;
`;

const UserInfo = styled.div`
  justify-content: flex-start !important;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
  img {
    width: 5rem;
    height: 5rem;
    border: 0.1rem solid #dadada;
    border-radius: 50%;
  }
  div {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  div > p:first-child {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const PostInfo = styled.div`
  padding: 2rem 0;
  font-size: 1.5rem;
  * {
    margin-bottom: 0.5rem;
  }
  div:nth-child(1) {
    font-size: 2rem;
    font-weight: bold;
  }
  div:nth-child(2) {
    color: gray;
  }
  div:nth-child(3) {
    padding: 1rem 0;
  }
`;
const LoadingPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 10000;
  width: 60rem;
  background: rgb(255, 138, 61);
  img {
    width: 50%;
    border-radius: 50%;
    background: white;
  }
`;

const ChatModal = styled.div`
  justify-content: space-between !important;
  width: 60rem;
  padding: 1rem 2rem 1rem 1rem;
  position: absolute;
  bottom: 10rem;
  background: rgba(255, 138, 61, 0.5);
  border-radius: 25px;
  color: white;
  font-size: 2rem;
  font-weight: bold;

  div > p {
    padding: 0 1rem;
  }
  div > p:first-child {
    cursor: pointer;
    font-size: 3rem;
    width: 5rem;
    height: 5rem;
    border-right: 0.2rem solid rgba(0, 0, 0, 0.1);
  }
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

export default Detail;