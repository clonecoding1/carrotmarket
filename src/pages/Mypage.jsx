import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getUserInfo, logOut } from "../redux/modules/tokenSlice";
import axios from "../axios/axios";
import { SiInstacart } from "react-icons/si";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import { deleteUser } from "../api/mypageAPI";
import { getUser } from "./../api/mypageAPI";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const zzim = useRef();
  const sell = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [userLikeList, setUserLikeList] = useState([]);
  const { isLogin, userToken, user } = useSelector((state) => state.tokenSlice);

  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그인 후 이용해주세요" }).then((res) => {
      navigate("/", { replace: true });
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

  useEffect(() => {
    if (isLogin === false) {
      alerts();
      navigate("/", { replace: true });
    } else {
      dispatch(getUserInfo());
    }
  }, []);

  useEffect(() => {
    getUser().then((res) => {
      console.log(res);
    });
  }, []);

  const onDeleteHandler = () => {
    realAlert();
  };

  return (
    <StMypage>
      <div className="header">
        <img src={userInfo.profile} alt="" />
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
          src="data:image/png;base64,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"
          alt="상품 이미지"
        />
        <p>중고거래는 이제 당근페이로 해보세요</p>
      </div>
      <div className="tap">
        <ul>
          <li>
            <div className="icons">
              <AiTwotoneHeart className={"active"} />
            </div>
            <p>찜한 목록</p>
          </li>
          <li>
            <div className="icons">
              <SiInstacart />
            </div>
            <p>판매 내역</p>
          </li>
        </ul>
      </div>
      <div className="listList">
        <ul>
          {userLikeList.map((data) => (
            <li key={data.postId}>
              <div className="left">
                <img src={data.img} alt="" />
              </div>
              <div className="center">
                <div className="title">{data.title}</div>
                <div className="location">{data.location}</div>
                <div className="price">{data.price.toLocaleString()}원</div>
              </div>
              <div className="right">
                <div className="heart">
                  <AiTwotoneHeart className={"active"} />
                </div>
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
        border: 1px solid #ccc;
      }
    }
  }

  & .notice {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='17' ry='17' stroke='coral' stroke-width='6' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 17px;
    overflow: hidden;
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

        & .icons {
          width: 50px;
          height: 50px;
          margin-bottom: 1rem;
          border-radius: 50%;
          background-color: rgb(255, 207, 176);
          display: flex;
          align-items: center;
          justify-content: center;

          & svg {
            width: 50%;
            height: 50%;
            vertical-align: center;
            color: #ccc;

            &.active {
              color: rgb(255, 138, 61);
            }
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

    & ul {
      & li {
        display: flex;
        padding: 2rem 1rem;
        box-shadow: 0 0.3rem 0.3rem -0.3rem;

        &:last-child {
          box-shadow: none;
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

      & .title {
        font-size: 1.8rem;
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
        }
      }
    }
  }
`;
