import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBar from "../../../components/TabBar";
import Profile from "../components/Profile";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import Post from "../components/Post";
import Header from "../components/Header";
import Liked from "../components/Liked";

import PurpleCommunityIcon from "../assets/PurpleCommunityICon.png";

const PostItemPage = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      // 키보드 감지: 현재 높이가 초기 높이보다 많이 줄었을때 키보드 감지 (앱화면에서)
      const heightDiff = initialHeight - window.innerHeight;
      if (heightDiff > 150) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Header/>
      <ScrollArea>
        <Profile />
        <Post />
        <Liked />
        <CommentListWrapper>
          <CommentList />
        </CommentListWrapper>
      </ScrollArea>

      {/* CommentInput 고정 */}
      <CommentInputWrapper isKeyboardOpen={isKeyboardOpen}>
        <CommentInput />
      </CommentInputWrapper>
    </Container>
  );
};



const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100vh;
  position: relative;
  background-color: #F8FAFF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollArea = styled.div`
  /* 핵심: 남은 영역을 모두 차지하게 */
  flex: 1 1 auto;

  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .3rem;

  /* %는 가로폭 기준이라 흔들릴 수 있어요. 인풋 높이(px)와 동일하게 */
  padding-bottom: 56px; 
`;

const CommentInputWrapper = styled.div`
  position: ${({ isKeyboardOpen }) => (isKeyboardOpen ? "fixed" : "absolute")};
  bottom: 0;
  width: 100%;

  /* 인풋 실제 높이를 px로 고정 */
  height: 3.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: #fff;
`;

const CommentListWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;


export default PostItemPage;
