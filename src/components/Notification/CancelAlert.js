import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as notiActions } from "../../redux/modules/notification";
import { io } from "socket.io-client";
import trash from "../../image/tra.png";

const CancelAlert = ({ noti }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    setSocket(io.connect(`https://www.walkadog.shop/notification/${userId}`));
  }, []);
  useEffect(() => {
    socket?.emit("postUser", userId);
  }, []);
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);
  const username = localStorage.getItem("userNickname")
  return (
    <div>
      <Wrap
     
      >
        <Left>
          <img src={noti.senderImage} />

          <span>{noti.senderNickname}</span>
        </Left>
        <Right>
          <Message>
            {username}님이 회원님의 산책요청을 거절했습니다!
          </Message>

          <Info>
            <Time>{noti.AGOTIME}</Time>
            <DeleteBtn
              onClick={() => {
                dispatch(notiActions.deleteNotiMD(noti.notificationId));
              }}
            >
              <img src={trash} />
            </DeleteBtn>
          </Info>
        </Right>
      </Wrap>
    </div>
  );
};

const Message = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
`;
const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
`;
const Time = styled.div`
  padding-right: 10px;
  padding-bottom: 3px;
  font-size: 12px;
`;
const DeleteBtn = styled.div`
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;
const Wrap = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 6em;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 15px;
  position: relative;
`;

const Left = styled.div`
  display: block;

  padding-left: 10px;
  padding-top: 10px;

  height: 100%;
  img {
    display: flex;
    justify-content: center;

    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    display: flex;
    justify-content: center;

    margin-bottom: 5px;
  }
  button {
    display: flex;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-left: 10px;
`;

export default CancelAlert;
