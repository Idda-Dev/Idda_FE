// src/components/CommentInput.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import PencilIcon from '../assets/PencilIcon.png';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CommentInput = ({ postId, userId, userNickname, userProfileImageUrl, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      try {
        const payload = { content: text };
        const res = await axios.post(
          `${BASE_URL}/api/users/${userId}/posts/${postId}/comments`,
          payload
        );

        setText('');

        const newCommentUri = res.headers['location'];
        if (newCommentUri) {
          const newCommentRes = await axios.get(`${BASE_URL}${newCommentUri}`);
          if (onCommentAdded) onCommentAdded(newCommentRes.data);
        } else if (onCommentAdded) {
          // fallback: 서버에서 Location 헤더 안 주면 유저 정보로 댓글 생성
          onCommentAdded({
            commentId: Date.now(),
            content: text,
            memberId: userId,
            nickname: userNickname,
            profileImageUrl: userProfileImageUrl,
            createdAt: new Date().toISOString(),
            postId: postId
          });
        }
      } catch (err) {
        console.error("댓글 전송 실패:", err);
      }
    }
  };

  return (
    <Container>
      <InputWrapper>
        {!text && <Placeholder>댓글을 입력하세요.<Icon src={PencilIcon} alt="댓글 아이콘" /></Placeholder>}
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder=""
        />
      </InputWrapper>
    </Container>
  );
};

export default CommentInput;

const Container = styled.div`
  width: 73%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Placeholder = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.8rem;
  pointer-events: none;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  object-fit: contain;
`;

const Input = styled.input`
  width: 70%;
  padding: 0.5rem 2rem; 
  border-radius: 36px;
  border: 1px solid #6F69B0;
  outline: none;
  font-size: 0.8rem;
`;
