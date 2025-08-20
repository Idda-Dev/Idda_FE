import React, { useState } from 'react';
import styled from 'styled-components';
import PencilIcon from '../assets/PencilIcon.png'; 
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// userId와 postId를 props로 받습니다.
const CommentInput = ({ postId, userId = 1 }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = async (e) => {
    // Enter 키를 누르고, 입력된 텍스트가 공백이 아닐 때
    if (e.key === 'Enter' && text.trim() !== '') {
      try {
        const payload = {
          content: text,
        };
        const res = await axios.post(`${BASE_URL}/api/users/${userId}/posts/${postId}/comments`, payload);
        
        console.log('댓글 전송 성공:', res.data);
        setText(''); // 전송 후 입력 필드 초기화
        
        // 댓글 목록을 새로고침하는 로직 (선택 사항)
        // 예: onCommentAdded() 함수를 props로 받아 실행
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
  max-width: 600px;
  
  &:focus-within {
    div {
      display: none;
    }
  }
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

export default CommentInput;