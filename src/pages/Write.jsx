import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// firebase
import { storage } from "../utils/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 슬라이더
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { addPost } from "../api/postAPI";
import { successAlert } from "../utils/swal";

const Write = () => {
  const nav = useNavigate();
  const moveRef = useRef(null);
  useEffect(() => {
    moveRef.current.style.left = 0;
    moveRef.current.style.opacity = 1;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
    getValues,
  } = useForm();

  // 멀티 업로드
  const [fileList, setFileList] = useState([]);
  const maxCnt = 6;
  const selectMutiFile = (files) => {
    const dt = new DataTransfer();
    const remainCnt = maxCnt - fileList.length;
    if (!fileList) {
      if (files.length > maxCnt) console.log(`사진은 최대 ${maxCnt}개 가능`);
      Array.from(files)
        .filter((file, i) => i < maxCnt)
        .forEach((file) => dt.items.add(file));
      setFileList(dt.files);
      return;
    }
    if (remainCnt < files.length) console.log(`사진은 최대 ${maxCnt}개 가능`);
    Array.from(fileList).forEach((file) => dt.items.add(file));
    Array.from(files)
      .filter((file, i) => i < remainCnt)
      .forEach((file) => dt.items.add(file));
    setFileList(dt.files);
  };

  // react-hook-form 이미지 미리보기
  const selectImg = watch("file");
  const [imgPreview, setImgPreview] = useState([]);
  useEffect(() => {
    if (selectImg) {
      for (let i = 0; i < maxCnt - imgPreview.length; i++) {
        const file = selectImg[i];
        if (!file) return;
        setImgPreview((imgPreview) => [...imgPreview, URL.createObjectURL(file)]);
      }
    }
  }, [selectImg]);

  // 이미지 선택 취소
  const cancelSelected = (fileIndex) => {
    const dt = new DataTransfer();
    Array.from(fileList)
      .filter((file, i) => i !== fileIndex)
      .forEach((file) => dt.items.add(file));
    setFileList(dt.files);

    setImgPreview(imgPreview.filter((view, i) => i !== fileIndex));
  };

  // 가격 콤마찍기 + type:number안쓰고 처리하기
  const krwRef = useRef(null);
  const priceComma = (e) => {
    const target = e.target;
    // 첫번째 정규식 : 숫자 거르기, 두번째 정규식 : 콤마 붙이기
    const replaceValue = target.value.replace(/[^\d]+/g, "").replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    setValue("price", replaceValue);

    krwRef.current.style.color = target.value === "" ? "#dadada" : "black";
  };

  // silder 옵션
  const carouselOpt = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
  };

  // register 타입별 옵션
  const fileOpt = {
    onChange: () => {
      selectMutiFile(getValues("file"));
    },
  };
  const titleOpt = {
    required: "제목",
  };
  const priceOpt = {
    required: "가격",
    onChange: priceComma,
  };
  const contentOpt = {
    required: "내용",
  };

  // required alert 처리
  const modalRef = useRef(null);
  const [modalToggle, setModalToggle] = useState();
  const errorsCheck = Object.keys(errors);
  useEffect(() => {
    modalRef.current.innerText = "";
    if (errorsCheck.length !== 0) {
      let emptyType = "";
      errorsCheck.forEach((type, i) => {
        emptyType += errors[type].message;
        if (i !== errorsCheck.length - 1) emptyType += ", ";
      });
      modalRef.current.innerText = emptyType + "을 입력해주세요";
      modalRef.current.style.bottom = "1rem";
      modalRef.current.style.opacity = 1;
    } else {
      modalRef.current.style.bottom = "-10rem";
      modalRef.current.style.opacity = 0;
    }
  }, [errorsCheck]);

  // submit후 fileList 업로드 or 없을때 처리
  const getImgURL = async () => {
    if (fileList.length === 0) {
      return "logo.png?alt=media&token=fb0a9820-20b9-475c-ba2f-3950d39b163e";
    } else {
      let img = "";
      for (let i = 0; i < fileList.length; i++) {
        const filename = fileList[i].name + ("_" + new Date().getTime());
        const uploadFile = await uploadBytes(ref(storage, `post-img/${filename}`), fileList[i]);
        const uploadImgURL = await getDownloadURL(uploadFile.ref);
        img += uploadImgURL.split("/o/")[1];
        if (i !== fileList.length - 1) img += ",";
      }
      return img;
    }
  };
  // submit후 axios전 데이터 가공
  const checkSubmit = async (data) => {
    let img = await getImgURL();
    const reqData = { img, title: data.title, content: data.content, price: data.price };
    const answer = await addPost(reqData);
    if (answer.result) {
      const confirmCheck = await successAlert();
      if (confirmCheck.isConfirmed || confirmCheck.isDismissed) nav("/");
    }
  };

  return (
    <WriteForm className="fcc" onSubmit={handleSubmit(checkSubmit)} ref={moveRef}>
      <FormFileArea>
        <FileLabel htmlFor="imgFile" className="fcc">
          <AiFillCamera />
          {fileList.length}/{maxCnt}
        </FileLabel>
        <CustomCarousel {...carouselOpt}>
          {imgPreview.map((image, i) => {
            return (
              <div style={{ position: "relative" }} key={i}>
                {i === 0 ? <RepImg className="fcc">대표사진</RepImg> : null}
                <ImgViewer src={image} />
                <DeletePreview
                  onClick={() => {
                    cancelSelected(i);
                  }}
                />
              </div>
            );
          })}
        </CustomCarousel>
        <input hidden id="imgFile" multiple type="file" accept=".png, .jpeg, .jpg" {...register("file", fileOpt)} />
      </FormFileArea>
      <FormInput autoComplete="off" placeholder="제목" {...register("title", titleOpt)} />
      <div>
        <Krw ref={krwRef}>₩</Krw>
        <FormInput autoComplete="off" maxLength="12" placeholder="가격" {...register("price", priceOpt)} />
      </div>
      <FormTextArea
        maxLength="335"
        placeholder="올릴 게시글 내용을 작성해주세요. 가품 및 판매금지 품목은 게시가 제한될 수 있어요."
        {...register("content", contentOpt)}
      />
      <ErrorModal className="fcc" ref={modalRef} />
      <button hidden id="submitBtn" disabled={isSubmitting} />
    </WriteForm>
  );
};

const WriteForm = styled.form`
  position: relative;
  overflow: hidden;
  left: 10rem;
  opacity: 0;
  height: 100%;
  padding: 2rem;
  flex-flow: column;
  transition-duration: 0.7s;
  & > * {
    width: 100%;
  }
  & > *:not(:nth-child(4), :nth-child(5)) {
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1) !important;
  }
`;

const FormFileArea = styled.div`
  height: 12rem;
  padding: 0 2rem 2rem;
  & > * {
    margin-right: 1rem;
  }
`;

const FileLabel = styled.label`
  cursor: pointer;
  position: absolute;
  flex-flow: column;
  width: 10rem;
  height: 10rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  background: #dadada;
  padding: 1rem;
  font-size: 1.8em;
  & > :first-child {
    font-size: 5em;
  }
`;

const CustomCarousel = styled(Carousel)`
  margin-left: 12rem;
  .slick-track {
    margin: 0;
  }
`;

const RepImg = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  width: 10rem;
  height: 3rem;
  background: black;
  color: white;
  font-size: 1.8rem;
  border-radius: 0 0 1rem 1rem;
`;

const ImgViewer = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  -webkit-user-drag: none;
`;

const DeletePreview = styled(MdCancel)`
  cursor: pointer;
  position: absolute;
  top: 0;
  margin-left: 7rem;
  font-size: 3rem;
  border-radius: 50%;
`;

const FormInput = styled.input`
  border: 0;
  outline: 0;
  padding: 2rem;
  font-size: 3rem;
`;

const Krw = styled.span`
  font-weight: bold;
  font-size: 3rem;
  padding-left: 2rem;
  color: #dadada;
`;

const FormTextArea = styled.textarea`
  border: 0;
  outline: 0;
  resize: none;
  padding: 2rem;
  flex: 1;
  font-size: 2rem;
`;

const ErrorModal = styled.div`
  width: 100%;
  height: 10rem;
  position: absolute;
  bottom: -10rem;
  transition-duration: 1s;
  opacity: 0;
  background: rgb(255, 138, 61);
  border-radius: 25px;
  color: white;
  font-size: 3rem;
  font-weight: bold;
`;

export default Write;
