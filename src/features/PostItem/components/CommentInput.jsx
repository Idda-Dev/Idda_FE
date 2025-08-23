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
    const newCommentContent = text;
    setText('');

    // 1️⃣ 임시 ID로 화면에 바로 반영
    const tempComment = {
      commentId: `temp-${Date.now()}`,
      content: newCommentContent,
      memberId: userId,
      nickname: userNickname,
      profileImageUrl: userProfileImageUrl,
      createdAt: new Date().toISOString(),
      postId: postId
    };
    if (onCommentAdded) onCommentAdded(tempComment);

    // 2️⃣ 서버에 POST 요청
    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/${userId}/posts/${postId}/comments`,
        { content: newCommentContent }
      );

      const location = res.headers['location'];
      if (location) {
        const newCommentRes = await axios.get(`${BASE_URL}${location}`);
        // 3️⃣ 실제 서버 ID로 덮어쓰기
        if (onCommentAdded) onCommentAdded(newCommentRes.data, true); 
      }
    } catch (err) {
      console.error("댓글 전송 실패:", err);
      // 실패 시 temp 댓글 그대로 유지하거나 삭제 처리 가능
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
