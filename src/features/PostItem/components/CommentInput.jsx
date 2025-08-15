import React, { useState } from 'react';
import styled from 'styled-components';
import PencilIcon from '../assets/PencilIcon.png'; // 댓글 아이콘

const CommentInput = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      console.log('댓글 전송:', text); // 서버 전송 로직 가능
      setText(''); // 입력 후 초기화
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

  &:focus-within ${'' /* 포커스 시 플레이스홀더 숨기기 */} {
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

