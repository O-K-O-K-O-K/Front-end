// DogProfile.js - 강아지 프로필 편집 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 리덕스
import { actionCreators as DogActions } from "../redux/modules/user";

// 컴포넌츠
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import DogModal from "../components/DogModal";
import DogSuccessModal from "../components/Modal/DogSuccessModal";

// 아이콘
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DogProfile = (props) => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.user.dog);

  // 이미지
  const [imgBase64, setImgBase64] = useState(dog.dogImage && dog.dogImage); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [dogName, setDogName] = useState(dog.dogName ? dog.dogName : "");
  const [dogBreed, setDogBreed] = useState(dog.dogBreed ? dog.dogBreed : "");
  const [dogSize, setDogSize] = useState();
  const [dogGender, setDogGender] = useState();
  const [dogAge, setDogAge] = useState();
  const [neutral, setNeutral] = useState();
  const [dogComment, setDogComment] = useState(
    dog.dogComment ? dog.dogComment : ""
  );

  const [modal, setModal] = useState();
  const [modal2, setModal2] = useState();

  const dogModal = useSelector((state) => state.user.dog_modal);

  const dogNameChangeHandler = (e) => {
    setDogName(e.target.value);
  };
  const dogBreedChangeHandler = (e) => {
    setDogBreed(e.target.value);
  };
  const dogSizeChangeHandler = (dogSize) => {
    setDogSize(dogSize);
  };
  const dogGenderChangeHandler = (dogGender) => {
    setDogGender(dogGender);
  };
  const dogNeutralChangeHandler = (neutral) => {
    setNeutral(neutral);
  };
  const dogAgeChangeHandler = (dogAge) => {
    setDogAge(dogAge);
  };
  const dogCommentChangeHandler = (e) => {
    setDogComment(e.target.value);
  };

  const update = () => {
    const dogInfo = {
      dogName,
      dogBreed,
      dogSize,
      dogGender,
      neutral,
      dogAge,
      dogComment,
    };
    dispatch(DogActions.updateDogMD(dogInfo));
  };

  useEffect(() => {
    dispatch(DogActions.getDogMD());
    setImgFile(dog.dogImage);
    setImgBase64(dog.dogImage);
    setDogName(dog.dogName);
    setDogBreed(dog.dogBreed);
    setDogSize(dog.dogSize);
    setDogGender(dog.dogGender);
    setNeutral(dog.neutral);
    setDogAge(dog.dogAge);
    setDogComment(dog.dogComment);
    setModal2(dogModal);
  }, [
    dog.dogImage,
    dog.dogName,
    dog.dogBreed,
    dog.dogSize,
    dog.dogGender,
    dog.neutral,
    dog.dogAge,
    dog.dogComment,
    dogModal,
  ]);

  // 페이지 상단 고정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrap>
      {modal2 ? <DogSuccessModal /> : ""}
      <TopBar only_left> 반려견 정보 수정</TopBar>

      {/* 이미지 클릭시 수정 모달 생성 */}
      <UserWrap>
        <UserInfoLeft onClick={() => setModal(true)}>
          <UserImg src={dog.dogImage} />
          <Edit>
            <ModeEditIcon />
          </Edit>
        </UserInfoLeft>
      </UserWrap>
      {modal && <DogModal setModal={setModal} dogImage={dog.dogImage} />}

      {/* 강아지 이름 */}
      <Filter>
        <Title>강아지 이름</Title>
        <Input
          placeholder="강아지 이름을 입력하세요. "
          onChange={dogNameChangeHandler}
          defaultValue={dog.dogName}
        />
      </Filter>

      {/* 강아지 종 */}
      <Filter>
        <Title>견종</Title>
        <Input
          placeholder="강아지 종을 입력하세요. ex) 말티즈, 비숑..."
          defaultValue={dog.dogBreed}
          onChange={dogBreedChangeHandler}
        />
      </Filter>

      {/* 강아지 크기 */}
      <Filter>
        <Title>크기</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                value="소형견"
                name="dogSize"
                type="radio"
                id="small"
                checked={dogSize === "소형견"}
                onClick={() => dogSizeChangeHandler("소형견")}
              />
            </RadioWrap>
            <Label for="small">소형견</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="중형견"
                name="dogSize"
                type="radio"
                id="medium"
                checked={dogSize === "중형견"}
                onClick={() => dogSizeChangeHandler("중형견")}
              />
            </RadioWrap>

            <Label for="medium">중형견</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="대형견"
                name="dogSize"
                type="radio"
                id="large"
                checked={dogSize === "대형견"}
                onClick={() => dogSizeChangeHandler("대형견")}
              />
            </RadioWrap>

            <Label for="large">대형견</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 성별 */}
      <Filter>
        <Title>성별</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                value="남"
                name="dogGender"
                type="radio"
                id="male"
                checked={dogGender === "남"}
                onClick={() => dogGenderChangeHandler("남")}
                style={{ width: "14px", height: "14px" }}
              />
            </RadioWrap>
            <Label for="male">남</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="여"
                name="dogGender"
                type="radio"
                id="female"
                checked={dogGender === "여"}
                onClick={() => dogGenderChangeHandler("여")}
                style={{ width: "14px", height: "14px" }}
              />
            </RadioWrap>
            <Label for="female">여</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 중성화 여부 */}
      <Filter>
        <Title>중성화 여부</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                value="Y"
                name="neutral"
                type="radio"
                id="yes"
                checked={neutral === "true"}
                onClick={() => dogNeutralChangeHandler("true")}
                style={{ width: "14px", height: "14px" }}
              />
            </RadioWrap>
            <Label htmlFor="yes">Y</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="N"
                name="neutral"
                type="radio"
                id="no"
                checked={neutral === "false"}
                onClick={() => dogNeutralChangeHandler("false")}
                style={{ width: "14px", height: "14px" }}
              />
            </RadioWrap>
            <Label htmlFor="no">N</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 나이대 */}
      <Filter>
        <Title>나이대</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="young"
                checked={dogAge === "0~3세"}
                onClick={() => dogAgeChangeHandler("0~3세")}
              />
            </RadioWrap>
            <Label for="young">0~3세</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="junior"
                checked={dogAge === "4~7세"}
                onClick={() => dogAgeChangeHandler("4~7세")}
              />
            </RadioWrap>
            <Label for="junior">4~7세</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="senior"
                checked={dogAge === "8세 이상"}
                onClick={() => dogAgeChangeHandler("8세 이상")}
              />
            </RadioWrap>
            <Label for="senior">8세 이상</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 한 줄 소개 */}
      <Filter>
        <Title> 한 줄 소개</Title>
        <Input
          placeholder="ex) 우리 집 최고 애교쟁이!"
          onChange={dogCommentChangeHandler}
          defaultValue={dog.dogComment}
        />
      </Filter>

      {/* 수정 완료 버튼 */}
      <ButtonWrap>
        <Add onClick={update}>수정하기</Add>
      </ButtonWrap>
      <NavBar />
    </Wrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const UserInfoLeft = styled.div`
  position: relative;

  width: 150px;
  height: 150px;
`;
const UserImg = styled.img`
  width: 150px;
  height: 150px;
  padding: 2px;
  background-size: cover;
  overflow: hidden;
  margin-right: 14.5px;
  border-radius: 50%;
  object-fit: cover;
`;
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.18);

  img {
    width: 22px;
    height: 22px;
  }
`;
const Wrap = styled.div`
  max-width: 100%;
  padding: 0 5%;
  font-size: 14px;
  text-align: center;
`;

const Filter = styled.div`
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  text-align: left;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  color: #888;
`;
const Title = styled.div`
  margin-bottom: 15px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const RadioWrap = styled.div``;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Label = styled.label`
  padding-top: 5px;
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const ButtonWrap = styled.div``;
const Add = styled.button`
  width: 160px;
  height: 48px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default DogProfile;
