// CommentList.jsx
import React from 'react';
import CommentListItem from "./CommentListItem";
import styled from 'styled-components';

const CommentList = ({ comments, userId=1, onCommentChange }) => {
  return (
    <Wrapper>
      {comments.map((comment) => (
        <CommentListItem
          key={comment.commentId}
          comment={comment}
          userId={userId}
          onCommentChange={onCommentChange} // 추가
        />
      ))}
    </Wrapper>
  );
};


export default CommentList;

/* styled-components */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
