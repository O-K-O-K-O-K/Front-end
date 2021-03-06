import React from "react";
import styled from "styled-components";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { useHistory } from "react-router";

const UserCard = (props) => {
  const post = props.post;
  const userImage = post.userImage;
  const userName = post.userNickname;
  const userGender = post.userGender;
  const userAge = post.userAge;

  const history = useHistory();

  return (
    <CardWrap
      onClick={() => {
        history.push("/userProfile");
      }}
    >
      {/* 카드 왼쪽 - 이미지 */}
      <img src={userImage} />

      {/* 카드 오른쪽 - 약속 정보*/}
      <CardInfo>
        <CardTop>
          <p>{userName + "/ " + userAge}</p>
        </CardTop>
        <p>{userGender}</p>
      </CardInfo>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 152px;

  margin-bottom: 24px;

  border-radius: 25px;
  background-color: #fff;
  color: #747474;

  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;
  cursor: pointer;

  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);

  img {
    width: 152px;
    height: 152px;
    border-radius: 25px;
    object-fit: cover;
  }
`;
const CardInfo = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20px;
`;
const CardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h4 {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  p {
    font-size: 16px;
  }
`;
const CardCenter = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
`;
const CardBottom = styled.div`
  width: 100%;
  padding: 10px;
`;

export default UserCard;
