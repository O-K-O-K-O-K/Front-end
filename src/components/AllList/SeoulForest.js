// SeoulForest.js - 산책가자 페이지에서 서울숲 산책목록이 모여있는 페이지
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

// 컴포넌츠
import Cards from "../AllList/Cards";
import Loading from "../Loading";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as walkActions } from "../../redux/modules/walk";

const SeoulForest = () => {
  const dispatch = useDispatch();
  const seoulList = useSelector((state) => state.post.seoul);
  const postList = useSelector((state) => state.walk.page_seoul);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(walkActions.pageSeoulMD(pageNum));
  }, [pageNum]);

  //무한 스크롤
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView();

  const getMoreItem = async () => {
    setIsLoaded(true);
    setPageNum(pageNum + 1);
    setIsLoaded(false);
  };

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  useEffect(() => {
    dispatch(postActions.getSeoulMD());
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrap>
        {postList.length === 0 ? (
          "등록된 산책 목록이 없습니다."
        ) : (
          <>
            {postList.map((post, index) => {
              const dogImage = post.dogImage;
              const dogName = post.dogName;
              const dogGender = post.dogGender;
              const dogAge = post.dogAge;
              const meetingDate = post.meetingDate;
              const Info = {
                dogImage,
                dogName,
                dogGender,
                dogAge,
                meetingDate,
                post,
              };

              return <Cards Info={Info} key={index} />;
            })}
            {/* 무한스크롤 페이지 인식 */}
            <div ref={ref}> </div>
          </>
        )}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {inView && postList.length !== seoulList.length ? <Loading /> : null}
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default SeoulForest;
