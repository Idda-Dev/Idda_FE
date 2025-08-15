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
  height: 100%;
  position: relative;
  background-color: #F8FAFF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollArea = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  
  /* CommentInput 높이만큼 패딩 추가 */
  padding-bottom: 8%; 
`;


const CommentListWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

const CommentInputWrapper = styled.div`
  // 키보드 앱에서 열었을 때 레이아웃설정
  position: ${({ isKeyboardOpen }) => (isKeyboardOpen ? "fixed" : "absolute")};
  bottom: ${({ isKeyboardOpen }) => (isKeyboardOpen ? "0" : "0")};
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: white;
`;


export default PostItemPage;
