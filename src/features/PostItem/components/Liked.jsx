import React, { useState } from 'react';
import styled from 'styled-components';

import LikedIcon from "../assets/LikedIcon.png"; 
import CommentIcon from "../assets/CommentIcon.png"; 

const Liked = () => {
  const [likedCount, setLikedCount] = useState(999);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikedCount(prev => prev - 1);
    } else {
      setLikedCount(prev => prev + 1);
    }
    setIsLiked(prev => !prev);
  };

  const formatCount = (count) => {
    return count > 999 ? "999+" : count;
  };

  return (
    <Container>
      <Wrapper>
        <LikedButton onClick={handleLikeToggle} isLiked={isLiked}>
          <img src={LikedIcon} alt="like" />
        </LikedButton>

        <LikedCount>좋아요 {formatCount(likedCount)}</LikedCount>
      </Wrapper>
      <Wrapper>
        <CommentButton>
          <img src={CommentIcon} alt="comment" />
        </CommentButton>
        <CommentCount>댓글 123</CommentCount>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 74%;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin: 0.6rem 0;
  background:none;
`;

const Wrapper = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  
`;

const LikedButton = styled.button`
  height: 100%;
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  background-color: ${({ isLiked }) => (isLiked ? "#D1CDFF" : "#ECEAFF")}; // 색 변경
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 16px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    outline: none;
    box-shadow: none;
  }

  img {
    width: 100%;
    height: 90%;
  }
`;


const CommentButton = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1; 
  background-color: #ECEAFF;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 16px;
  cursor: default; /* 마우스 포인터 기본화, 클릭 불가 느낌 */
  
  img {
    width: 100%;
    height: 100%;
  }
`;


const LikedCount = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentCount = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Liked;
