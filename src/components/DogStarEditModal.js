import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// 리덕스
import { actionCreators as postActions } from "../redux/modules/dogsta";

// 아이콘
import { Close } from "@mui/icons-material";
import Spinner from "../shared/Spinner";
import SuccessModal from "./Modal/SuccessModal";

const DogStarEditModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgBase64, setImgBase64] = useState(props.dogStarImage); // 파일 base64
  const [imgFile, setImgFile] = useState(); //파일
  const [loading, setLoading] = useState();

  const editImage = () => {
    const image = imgFile ? imgFile : props.dogStarImage;
    if (imgBase64 == props.dogStarImage) {
      window.alert("이미지를 수정하지 않았습니다");
      return;
    }
    const formData = new FormData();
    formData.append("dogPostImage", imgFile);
    setLoading(true);
    dispatch(postActions.editPostImageMD(formData, props.dogPostId));
  };
  const handleChangeFile = (event) => {
    // 이미지 파일
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
    // else
    // reader.readAsDataURL(userImage);
    //   setImgFile(userImage)
  };

  if (loading) {
    <Spinner />;
  }
  return (
    <React.Fragment>
      <Component />
      <ModalComponent>
        <ModalExitBtn
          onClick={() =>
            window.location.replace(
              `/dogstaEdit/${props.currentPostUserId}/${props.dogPostId}`
            )
          }
        >
          <Close />
        </ModalExitBtn>
        <ModalHeader>개스타그램이미지를 수정하겠습니까?</ModalHeader>
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <UploadLabel for="imgFile">사진 업로드</UploadLabel>
          <AddImage
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </ImageWrap>
        <ModalButtonContainer>
          <ModalSubmitBtn onClick={editImage}> 이미지 수정 </ModalSubmitBtn>
        </ModalButtonContainer>
      </ModalComponent>
    </React.Fragment>
  );
};
const Component = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  height: 100vh;
  width: 100%;
  background-color: black;
  z-index: 10;
`;
const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 450px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
`;
const ModalInput = styled.div`
  box-sizing: border-box;
  width: 50%;
`;
const ModalButtonContainer = styled.div`
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 30px;
`;
const ModalSubmitBtn = styled.button`
  width: 100%;
  background-color: #ffe812;
  border: none;
  outline: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
`;
const ModalExitBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 0;
  padding: 8px 12px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
`;
const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
const Preview = styled.img`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
  object-fit: cover;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const UploadLabel = styled.label`
  border-bottom: 1px solid black;
  padding: 10px 5px 5px 5px;
  margin: 10px;
  cursor: pointer;
`;
const AddImage = styled.input`
  /* width: 180px;
  margin: 10px 0; */
  display: none;
`;

export default DogStarEditModal;
