import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PostList from "../features/Post/components/PostList";
import Nocation from "../features/Post/components/Nocation";


const CommunityPage = () => {
  const [location, setLocation] = useState("노량진동"); // 기본값

  return (
    <Container>
      <Header title="다같이 한걸음" backPath="/" />
      <Wrapper>
        <Nocation location={location} />
        <PostListWrapper>
          <PostList setLocation={setLocation} />
        </PostListWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #f8faff;
  padding-top: 2rem;
`;

const Wrapper = styled.div`
  width: calc(74% + 2rem);
  height: calc(100% - 3.5rem);
  padding-top: 52px; // 헤더 높이만큼 띄움
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const PostListWrapper = styled.div`
  flex: 1; /* 남는 영역을 다 차지 */
  overflow-y: auto; /* 스크롤 가능 */
`;

export default CommunityPage;
