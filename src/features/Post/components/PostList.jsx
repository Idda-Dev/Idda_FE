import React from 'react'
import styled from 'styled-components';
import PostListItem from './PostListItem';

const PostList = () => {
  return (
    <Container>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
    </Container>
  );
};

const Container = styled.div`
    height: 92%;
    padding: 1rem 1rem;
`

export default PostList;