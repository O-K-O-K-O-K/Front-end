import React from "react";
import styled from "styled-components";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const Card = ({ post }) => {
  const dogImage = post.dog_image;
  const dogName = post.dog_name;
  const dogGender = post.dog_gender;
  const dogAge = post.dog_age;
  const dogComment = post.dog_comment;
  const initialMeetingDate = post.meeting_date;

  const meetingDate = initialMeetingDate.split('T')[0];
  const year = meetingDate.split('-')[0];
  const month = meetingDate.split('-')[1];
  const day = meetingDate.split('-')[2];
  const meetingTime = initialMeetingDate.split('T')[1];
  const hour = meetingTime.split(':')[0];
  const minute = meetingTime.split(':')[1];

  return (
    <CardWrap>
      {/* 카드 왼쪽 - 이미지 */}
      <img src={dogImage} />

      {/* 카드 오른쪽 - 약속 정보*/}
      <CardInfo>
        <CardTop>
          <h4> {dogGender === "남" ? <BsGenderMale /> : <BsGenderFemale />}</h4>
          <p>{dogName + ", " + dogAge}</p>
        </CardTop>
        <CardCenter>{dogComment}</CardCenter>
        <CardBottom>{year}년 {month}월 {day}일 <br />{hour}시 {minute}분</CardBottom>
      </CardInfo>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 176px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 25px;
  background-color: #ebebeb;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;
  cursor: pointer;
  img {
    width: 152px;
    height: 152px;
    border-radius: 25px;
  }
`;
const CardInfo = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: 100%;
  padding: 10px;
`;
const CardBottom = styled.div`
  width: 100%;
  padding: 10px;
`;

export default Card;
