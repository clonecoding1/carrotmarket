import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getUserInfo, logOut } from "../redux/modules/tokenSlice";
import axios from "../axios/axios";
import { SiInstacart } from "react-icons/si";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import { deleteUser, getLikeList, getUser, getMyList } from "../api/mypageAPI";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const zzim = useRef();
  const sell = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [list, setList] = useState([]);
  const [myList, setMyList] = useState(false);

  //찜한목록
  const onZzimHandler = () => {
    zzim.current.className = "icons active";
    sell.current.className = "icons";
    getLikeList().then((res) => {
      if (res.result) {
        setMyList(false);
        const likeList = [];
        if (res.res.length === 0) {
          setList([]);
          return;
        }
        for (let i = 0; i < res.res.length; i++) {
          likeList.push(...Object.values(res.res[i]));
          setList(likeList);
        }
      }
    });
  };

  console.log(list);

  //판매목록
  const onSellHandler = () => {
    zzim.current.className = "icons";
    sell.current.className = "icons active";
    getMyList().then((res) => {
      if (res.result) {
        setMyList(true);
        if (res.res.length === 0) {
          setList([]);
          return;
        }
        const likeList = [];
        for (let i = 0; i < res.res.length; i++) {
          likeList.push(...Object.values(res.res[i]));
          setList(likeList);
        }
      }
    });
  };

  const realAlert = () => {
    Swal.fire({
      title: "회원탈퇴 하시겠습니까?",
      text: "한번 탈퇴하면 영원히 재가입 불가능합니다",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "탈퇴",
      denyButtonText: `취소`,
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire("회원 탈퇴 되었습니다", "", "success").then((res) => {
          deleteUser().then(() => {
            navigate("/");
            dispatch(logOut());
          });
        });
      } else {
        Swal.fire("회원 탈퇴가 취소 되었습니다", "", "error");
      }
    });
  };

  // useEffect(() => {
  //   dispatch(getUserInfo());
  // }, []);

  useEffect(() => {
    getUser().then((res) => {
      if (res.result) {
        setUserInfo(res.res.user);
      } else {
        Swal.fire("회원 정보 불러오기에 실패하였습니다", "", "error");
      }
    });
  }, []);

  //최초 좋아요 목록 가져오기
  useEffect(() => {
    getLikeList().then((res) => {
      if (res.result) {
        const likeList = [];
        for (let i = 0; i < res.res.length; i++) {
          likeList.push(...Object.values(res.res[i]));
          setList(likeList);
        }
      }
    });
  }, []);

  const onDeleteHandler = () => {
    realAlert();
  };

  return (
    <StMypage>
      <div className="header">
        <img
          src={
            userInfo.profile
              ? userInfo.profile.includes("user-img")
                ? process.env.REACT_APP_IMGURL + userInfo.profile
                : userInfo.profile
              : null
          }
          alt=""
        />
        <div className="textWrapper">
          <p className={"nickname"}>{userInfo.nickname}</p>
          <p>{userInfo.location}</p>
        </div>
        <div className="widthdrawal">
          <button onClick={onDeleteHandler}>회원 탈퇴</button>
        </div>
      </div>
      <div className="notice">
        <img
          src={
            process.env.REACT_APP_IMGURL +
            "carrot-pay.jpg?alt=media&token=88f26cfb-a497-4bb9-943a-7f4affa790bf"
          }
          alt="상품 이미지"
        />
        <p>중고거래는 이제 당근페이로 해보세요</p>
      </div>
      <div className="tap">
        <ul>
          <li onClick={onZzimHandler}>
            <div ref={zzim} className="icons active">
              <AiTwotoneHeart />
            </div>
            <p>관심 목록</p>
          </li>
          <li onClick={onSellHandler}>
            <div ref={sell} className="icons">
              <SiInstacart />
            </div>
            <p>판매 목록</p>
          </li>
        </ul>
      </div>
      <div className="listList">
        <ul>
          {list.length === 0 && <li className="empty">아직 목록이 없어요.</li>}
          {list.map((data) => (
            <li
              key={data.postId}
              onClick={() => {
                navigate(`/detail/${data.postId}`);
              }}
            >
              <div className="left">
                <img src={process.env.REACT_APP_IMGURL + data.img} alt="" />
              </div>
              <div className="center">
                <div className="title">{data.title}</div>
                <div className="location">{data.location}</div>
                <div className="price">{data.price}원</div>
              </div>
              <div className="right">
                {myList ? (
                  <div className="heart"></div>
                ) : (
                  <div className="heart">
                    <AiTwotoneHeart className={"active"} />
                  </div>
                )}
                <div className="heartCount">
                  <AiOutlineHeart />
                  {data.likeCount}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StMypage>
  );
};

export default Mypage;

const StMypage = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .header {
    margin: 2rem 0;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    padding: 0 2rem;

    img {
      width: 10rem;
      height: 10rem;
      object-fit: cover;
      border-radius: 50%;
      overflow: hidden;
    }

    & .textWrapper {
      margin-left: 2rem;
      flex: 1;

      & .nickname {
        font-weight: 700;
        font-size: 1.8rem;
      }

      & p:first-child {
        margin-bottom: 1rem;
      }
    }

    & .widthdrawal {
      & button {
        padding: 1rem 2rem;
        border-radius: 10px;
        border: none;
      }
    }
  }

  & .notice {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='17' ry='17' stroke='coral' stroke-width='6' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 17px;
    margin: 1rem 2rem;
    display: flex;
    align-items: center;

    & img {
      padding: 1rem;
      width: 13rem;
      object-fit: cover;
      height: 6rem;
    }

    & p {
      margin-left: 3rem;
      padding: 2rem;
    }
  }

  & .tap {
    font-size: 1.6rem;

    & ul {
      display: flex;
      justify-content: center;
      border-bottom: 0.5rem solid #eee;

      & li {
        width: 50%;
        text-align: center;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        position: relative;

        &:first-child::before {
          position: absolute;
          content: "";
          display: block;
          width: 3px;
          height: 70%;
          background-color: #eee;
          top: 20px;
          right: 0;
        }

        & .icons {
          width: 50px;
          height: 50px;
          margin-bottom: 1rem;
          border-radius: 50%;
          background-color: rgb(255, 207, 176);
          display: flex;
          align-items: center;
          justify-content: center;

          &.active svg {
            color: rgb(255, 138, 61);
          }

          & svg {
            width: 50%;
            height: 50%;
            vertical-align: center;
            color: #ccc;
          }
        }

        &:hover {
          & svg {
            color: white;
          }
        }
      }
    }
  }

  & .listList {
    padding: 1rem 0;
    flex: 1;

    & ul {
      min-height: 100%;
      display: flex;
      flex-direction: column;

      & .empty {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #aaa;
      }

      & li {
        display: flex;
        padding: 2rem 1rem;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        &:last-child {
          box-shadow: none;
          border: none;
        }

        &:hover {
          & p {
            font-weight: bold;
          }
        }
      }
    }

    & .left {
      & img {
        width: 12rem;
        height: 12rem;
        border-radius: 1.5rem;
        object-fit: cover;
      }

      margin-right: 2rem;
    }

    & .center {
      flex: 1;
      max-width: 392.11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      & .title {
        font-size: 1.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & .location {
        color: #999;
        margin: 1rem 0;
      }

      & .price {
        font-weight: 700;
      }
    }

    & .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 2rem;

      & .heart {
        color: rgb(255, 138, 61);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 2.3rem;
      }

      & .heartCount {
        display: flex;
        align-items: center;

        & svg {
          margin-top: 2px;
          margin-right: 3px;
        }
      }
    }
  }
`;
