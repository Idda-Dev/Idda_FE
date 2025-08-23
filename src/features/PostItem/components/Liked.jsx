import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import LikedIcon from "../assets/LikedIcon.png";
import CommentIcon from "../assets/CommentIcon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Liked = ({ postId, userId = 1, heartCount, commentCount }) => {
  const [likedCount, setLikedCount] = useState(heartCount || 0);
  const [isLiked, setIsLiked] = useState(false); // 서버에서 true/false 받아올 수 있음

  const handleLikeToggle = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/posts/${postId}/hearts/users/${userId}`
      );

      if (res.data.liked) {
        setLikedCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setLikedCount((prev) => Math.max(prev - 1, 0));
        setIsLiked(false);
      }
    } catch (err) {
      console.error("좋아요 요청 실패:", err);
    }
  };

  const formatCount = (count) => (count > 999 ? "999+" : count);

  return (
    <Container>
      <Wrapper>
        <LikedButton onClick={handleLikeToggle} $isLiked={isLiked}>
          <img src={LikedIcon} alt="like" />
        </LikedButton>
        <LikedCount>좋아요 {formatCount(likedCount)}</LikedCount>
      </Wrapper>

      <Wrapper>
        <CommentButton>
          <img src={CommentIcon} alt="comment" />
        </CommentButton>
        <CommentCount>댓글 {commentCount}</CommentCount>
      </Wrapper>
    </Container>
  );
};

export default Liked;

/* styled-components */
const Container = styled.div`
  width: 74%;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin: 0.6rem 0;
  background: none;
`;

const Wrapper = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const LikedButton = styled.button`
  height: 2rem;
  aspect-ratio: 1 / 1;
  background-color: ${({ $isLiked }) => ($isLiked ? "#D1CDFF" : "#ECEAFF")};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 16px;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }

  img {
    width: 1rem;
    height: 0.9rem;
  }
`;

const CommentButton = styled.div`
  height: 2rem;
  aspect-ratio: 1 / 1;
  background-color: #eceaff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 16px;
  cursor: default;

  img {
    width: 1rem;
    height: 1rem;
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
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
