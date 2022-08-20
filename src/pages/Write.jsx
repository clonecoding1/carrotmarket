import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AiFillCamera } from "react-icons/ai";

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm();

  // 다중 업로드 + react-hook-form 이미지 미리보기
  const [fileList, setFileList] = useState([]);

  const selectImg = watch("file");
  const [imgPreview, setImgPreview] = useState([]);
  useEffect(() => {
    if (selectImg && selectImg.length !== 0) {
      const file = selectImg[0];
      setImgPreview([...imgPreview, URL.createObjectURL(file)]);
    }
  }, [selectImg]);

  // register 타입별 옵션
  const fileOpt = {};

  return (
    <WriteForm
      className="fcc"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <FormFileArea>
        <FileLabel htmlFor="file" className="fcc">
          <AiFillCamera />
          {/* {fileList.length}/4 */}
        </FileLabel>
        {imgPreview.map((image, i) => {
          return <ImgViewer src={image} key={i} />;
        })}
        <input hidden id="file" type="file" accept=".png, .jpeg, .jpg" {...register("file", {})} />
      </FormFileArea>
      <FormInput placeholder="제목" {...register("title")} />
      <FormInput placeholder="₩ 가격" {...register("price")} />
      <FormTextArea placeholder="올릴 게시글 내용을 작성해주세요. 가품 및 판매금지 품목은 게시가 제한될 수 있어요." {...register("content")} />
      <button disabled={isSubmitting}>제출</button>
    </WriteForm>
  );
};

const WriteForm = styled.form`
  height: 100%;
  padding: 2rem;
  flex-flow: column;
  & > * {
    width: 100%;
  }
`;

const FormFileArea = styled.div`
  display: flex;
  overflow: auto;
  padding: 0 2rem 2rem;
  & > * {
    margin-right: 1rem;
  }
`;

const FileLabel = styled.label`
  flex-flow: column;
  width: 8rem;
  height: 8rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background: #dadada;
  padding: 1rem;
  font-size: 1.5em;
  & > :first-child {
    font-size: 5em;
  }
`;

const ImgViewer = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 0.5rem;
`;

const FormInput = styled.input`
  border: 0;
  outline: 0;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-size: 2rem;
`;

const FormTextArea = styled.textarea`
  border: 0;
  outline: 0;
  resize: none;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  flex: 1;
  font-size: 1.5rem;
`;

export default Write;
