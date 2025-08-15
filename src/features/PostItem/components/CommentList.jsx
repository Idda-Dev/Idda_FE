import React from 'react'
import CommentListItem from "./CommentListItem";
import styled from 'styled-components';

const CommentList = () => {
  return (
    <Wrapper>
    <CommentListItem/>
    <CommentListItem/>
    <CommentListItem/>
    <CommentListItem/>
    <CommentListItem/>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`


export default CommentList;