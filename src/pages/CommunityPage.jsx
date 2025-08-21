// src/pages/CommunityPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PostList from "../features/Post/components/PostList";
import Location from "../features/Post/components/Location";
import { userinfo } from "../mocks/userinfo"; // userinfo mock 데이터 import

const CommunityPage = () => {
  const [location, setLocation] = useState(userinfo.location);

  return (
    <Container>
      <Header title="다같이 한걸음" backPath="/" />
      <Wrapper>
        <Location location={location} setLocation={setLocation} />
        <PostListWrapper>
          {/* location 상태를 PostList 컴포넌트에 props로 전달 */}
          <PostList location={location} />
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
  padding-top: 52px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default CommunityPage;