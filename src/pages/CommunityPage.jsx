import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PostList from "../features/Post/components/PostList";
import Location from "../features/Post/components/Location";
import { userinfo } from "../mocks/userinfo";

import { useSearchParams } from "react-router-dom";

const CommunityPage = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || userinfo.location;
  const [location, setLocation] = useState(initialLocation);

  return (
    <Container>
      <Header title="다같이 한걸음" backPath="/" />
      <Wrapper>
        <Location location={location} setLocation={setLocation} />
        <PostListWrapper>
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
  height: 100%; /* 탭바 고려 X */
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
