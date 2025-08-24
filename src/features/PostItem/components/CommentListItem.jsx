import React, { useState } from 'react';
import styled from 'styled-components';
import ModalIcon from "../assets/ModalIcon.png";
import CommentModal from './CommentModalPage';

const CommentListItem = ({ comment, userId=1, onCommentChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { nickname, content, profileImageUrl, createdAt, memberId } = comment;
  const isMyComment = memberId === userId;

  const formatTime = (isoString) => {
  const date = new Date(isoString);
  // 한국 시간 UTC+9
  const koreaOffset = 9 * 60; // 9시간
  const local = new Date(date.getTime() + koreaOffset * 60 * 1000);
  const month = (local.getMonth() + 1).toString().padStart(2, '0');
  const day = local.getDate().toString().padStart(2, '0');
  const hours = local.getHours().toString().padStart(2, '0');
  const minutes = local.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

  return (
    <Container>
      <Wrapper>
        <ProfileImage src={profileImageUrl} alt="프로필 이미지" />
        <NickName>{nickname}</NickName>
        <ModalButton onClick={() => setIsModalOpen(true)}>
          <img src={ModalIcon} alt="액션 버튼" />
        </ModalButton>
      </Wrapper>

      <Content>{content}</Content>
      <Time>{formatTime(createdAt)}</Time>

      <ModalContainer>
        <CommentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          isMyComment={isMyComment}
          comment={comment}
          userId={userId}
          onCommentChange={(updatedOrDeleted, type) => {
            if(onCommentChange) onCommentChange(updatedOrDeleted, type);
            setIsModalOpen(false);
          }}
        />

      </ModalContainer>
    </Container>
  );
};

export default CommentListItem;

const Container = styled.div`
  background-color: #F8FAFF;
  width: 100%;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  padding: 0.3rem 3.3rem; 
  border-top: 1px solid #ECEAFF;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 1.6rem;
`;

const ModalButton = styled.button`
  margin-left: auto;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  outline: none;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent;

  img {
    height: 80%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
  }
`;

const ProfileImage = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
`;

const NickName = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 16px;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const Content = styled.p`
  font-size: 0.7rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: start;
  margin: 0.3rem 0 0 0;
  word-break: break-word;
  white-space: normal;
`;

const Time = styled.p`
  letter-spacing: 0.3px;
  margin: 0.3rem 0 0 0;
  text-align: start;
  font-size: 0.55rem;
  color: #7F7F7F;
`;

const ModalContainer = styled.div`
  width: 100%;
`;
