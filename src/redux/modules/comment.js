import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// action creators
const addComment = createAction(ADD_COMMENT, (commentList) => ({
  commentList,
}));
const getComment = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));
const editComment = createAction(EDIT_COMMENT, (commentList, commentId) => ({
  commentList,
  commentId,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentList) => ({
  commentList,
}));

// initialState
const initialState = {
  commentList: [],
};

// middleware
const addCommentMD = (dogPostId, comment) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `http://13.209.70.209/comment/${dogPostId}`,
      data: comment,
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(addComment(comment));
        dispatch(getCommentMD(dogPostId));
      })
      .catch((err) => {
        // console.log("댓글 post 실패", err);
      });
  };
};

const getCommentMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/comment/${dogPostId}`,
    })
      .then((res) => {
        const commentList = res.data.comment;
        dispatch(getComment(commentList));
      })
      .catch((err) => {
        // console.log("댓글 get 에러", err);
      });
  };
};

const editCommentMD = (dogPostId, commentId, commentList) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "PATCH",
      url: `http://13.209.70.209/comment/${dogPostId}/${commentId}`,
      data: commentList,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(editComment(commentList, commentId));
        // console.log("댓글 수정", res.data);
      })
      .catch((err) => {
        // console.log("댓글 수정 에러", err);
      });
  };
};

const deleteCommentMD = (dogPostId, commentId) => {
  return function (dispatch, getState, { history }) {
    // console.log(id);
    axios({
      method: "DELETE",
      url: `http://13.209.70.209/comment/${dogPostId}/${commentId}`,
      data: {},
      headers: {
        accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {});
  };
};

// reducer
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList.push(action.payload.commentList);
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let commentIdx = draft.commentList.findIndex(
          (comment) => comment.commentId == action.payload.commentId
        );
        // console.log(commentIdx)
        draft.commentList[commentIdx] = {
          ...draft.commentList[commentIdx],
          ...action.payload.commentList,
        };
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (comment) => comment.commentId !== action.payload.commentList
        );
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
      }),
  },
  initialState
);

const actionCreators = {
  addComment,
  addCommentMD,
  getComment,
  getCommentMD,
  editComment,
  editCommentMD,
  deleteComment,
  deleteCommentMD,
};

export { actionCreators };
