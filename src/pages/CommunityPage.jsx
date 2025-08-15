import React from "react";
import styled from "styled-components";
import CommunityHeader from "../features/Post/components/CommunityHeader";
import PostList from "../features/Post/components/PostList";
import Nocation from "../features/Post/components/Nocation";

const CommunityPage = () => {
  return (
    <Container>
      <CommunityHeader />
      <Wrapper>
        <Nocation />
        <PostListWrapper>
          <PostList />
        </PostListWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  align-items: center;
  background-color: #f8faff;
  padding-bottom: 2.5rem;
`;

const Wrapper = styled.div`
  width: calc(74% + 2rem);
  height: calc(100% - 52px - 2.5rem); /* 헤더 + nocation 높이 제외 */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PostListWrapper = styled.div`
  flex: 1; /* 남는 영역을 다 차지 */
  overflow-y: auto; /* 스크롤 가능 */
`;

export default CommunityPage;
