// DogStaDetail.js - 개스타그램 게시물 하나에 대한 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import CommentList from "../../components/DogstaComment/CommentList";
import CommentWrite from "../../components/DogstaComment/CommentWrite";
import Spinner from "../../shared/Spinner";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";
import { actionCreators as commentActions } from "../../redux/modules/comment";

// 아이콘
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const DogStaDetail = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => state.dogsta.eachList); // 현재 개스타그램 게시물 정보
  const postId = props.match.params.dogPostId; // 현재 개스타그램 게시물의 아이디
  const currentPostUserId = props.match.params.userId; // 현재 게시물을 쓴 사람의 아이디
  const userId = localStorage.getItem("userId"); // 현재 로그인 한 사람의 아이디
  const userImage = localStorage.getItem("image"); // 현재 로그인 한 사람 이미지

  const likeCnt = useSelector((state) => state.dogsta.likeCnt); // 게시물 좋아요 수
  const myLike = useSelector((state) => state.dogsta.likeExist); // 게시물 좋아요 여부
  const commentList = useSelector((state) => state.comment.commentList); // 댓글 전체

  // 좋아요 여부, 좋아요 갯수
  const [liked, setLiked] = useState(Boolean);
  const [likeCount, setLikeCount] = useState();
  const [loading, setLoading] = useState();

  const toggleLike = () => {
    if (liked === true) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      if (likeCount < 0) {
        return;
      }
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
    dispatch(dogstaActions.toggleLikeMD(postId, liked));
  };

  const editPost = () => {
    history.push(`/dogStaEdit/${currentPostUserId}/${postId}`);
  };

  const deletePost = () => {
    setLoading(true);
    dispatch(dogstaActions.deletePostMD(postId)); // 삭제하기 함수
  };

  useEffect(() => {
    dispatch(dogstaActions.getPostMD(currentPostUserId, postId)); // 현재 개스타그램 게시물 정보 불러오기
    dispatch(dogstaActions.getLikesMD(postId)); // 현재 게시물 좋아요 갯수
    dispatch(dogstaActions.getMyLikeMD(postId)); // 내가 좋아요 눌렀는지 여부
    dispatch(commentActions.getCommentMD(postId)); // 댓글

    setLiked(myLike);
    setLikeCount(likeCnt);
  }, [myLike, likeCnt, postId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Wrap>
        {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}
        <TopBar>{post.userNickname}님의 게시물</TopBar>

        {/* 유저 정보 - 사진,닉네임*/}
        <UserInfo
          onClick={() => {
            history.push(`/mypage/${post.userId}`);
          }}
        >
          <UserImg src={post.userImage} />
          <span>{post.userNickname}</span>
        </UserInfo>

        {/* 게시물 부분 */}
        <Write>
          {/* 게시물 이미지 */}
          <ImageWrap>
            <PostImage src={post.dogPostImage} />
          </ImageWrap>

          {/* 게시물 정보 */}
          <PostInfo>
            <Left>
              <LikeCnt>
                {/* 좋아요 버튼 토글 */}
                {liked ? (
                  <FavoriteIcon
                    onClick={toggleLike}
                    sx={{ fontSize: 24 }}
                    style={{
                      color: "red",
                      verticalAlign: "middle",
                      marginRight: "4px",
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={toggleLike}
                    sx={{ fontSize: 24 }}
                    style={{ verticalAlign: "middle", marginRight: "4px" }}
                  />
                )}
                {likeCount}
              </LikeCnt>

              {/* 댓글 */}
              <CommentCnt>
                <CommentOutlinedIcon
                  sx={{ fontSize: 24 }}
                  style={{ verticalAlign: "middle", marginRight: "4px" }}
                />
                {commentList.length}
              </CommentCnt>

              {/* 현재 로그인한 유저가 작성한 게시물이 아닌 경우, 해당 게시물 유저에게 쪽지 보내기 */}
              {currentPostUserId !== userId && (
                <MailOutlineIcon
                  sx={{ fontSize: 24 }}
                  onClick={() => {
                    history.push(`/chatwrite/${currentPostUserId}`);
                  }}
                  style={{ verticalAlign: "bottom", cursor: "pointer" }}
                />
              )}
            </Left>

            {/* 현재 로그인 한 유저가 작성한 게시물 일 때 수정, 삭제 버튼 보여주기 */}
            <Right>
              {currentPostUserId === userId && (
                <BtnWrap>
                  <button onClick={editPost}>수정</button>
                  <span>|</span>
                  <button onClick={deletePost}>삭제</button>
                </BtnWrap>
              )}
            </Right>
          </PostInfo>
          <PostDesc>{post.dogPostDesc}</PostDesc>
          <Time>{post.AGOTIME}</Time>
        </Write>

        {/* 댓글 리스트 */}
        <CommentWrap>
          {commentList[0] ? (
            <div>
              {commentList.map((comment, index) => {
                return (
                  <div>
                    <CommentList comment={comment} key={index} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>등록된 댓글이 없습니다.</div>
          )}
        </CommentWrap>

        {/* 댓글 작성 */}
        <CommentWrite userId={userId} postId={postId} userImage={userImage} />
      </Wrap>

      {/* 하단 고정 */}
      <NavBar add_dogsta />
    </>
  );
};

const Wrap = styled.div`
  padding: 0 5%;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  cursor: pointer;
  span {
    font-weight: 600;
  }
`;
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;
const Write = styled.div`
  width: 100%;
`;
const ImageWrap = styled.div`
  width: 100%;
  border-radius: 14px;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  border-radius: 14px;
`;
const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 12px 0;
`;

const Left = styled.div``;
const Right = styled.div``;

const LikeCnt = styled.span`
  font-size: 14px;
  margin-right: 12px;
  cursor: pointer;
`;
const CommentCnt = styled.span`
  font-size: 14px;
  margin-right: 12px;
`;
const BtnWrap = styled.div`
  display: flex;
  button {
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  span {
    font-size: 14px;
    color: #bdbdbd;
    padding: 0 6px;
  }
`;

const PostDesc = styled.p``;
const Time = styled.div`
  font-size: 14px;
  color: #bdbdbd;
  margin: 12px 0;
`;

const CommentWrap = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 12px 0;
  div {
    font-size: 14px;
  }
`;

export default DogStaDetail;
