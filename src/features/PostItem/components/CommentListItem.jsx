import React, { useState } from 'react';
import styled from 'styled-components';
import ModalIcon from "../assets/ModalIcon.png";
import CommentModal from './CommentModalPage';

const CommentListItem = ({nickname, content, profileImageUrl,createTime}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Time>{createTime}</Time>

      <ModalContainer>
        <CommentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
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
  height: 1.6rem; /* 닉네임 높이에 맞춤 */
`;
const ModalButton = styled.button`
  margin-left: auto; /* 오른쪽 끝으로 밀기 */
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 100%; /* Wrapper 높이에 맞춤 */
  display: flex;
  align-items: center;

  /* 클릭/터치 시 하이라이트 제거 */
  outline: none;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent;    

  img {
    height: 80%;        /* Wrapper 높이에 맞춤 */
    aspect-ratio: 1 / 1; /* 항상 1:1 비율 */
    object-fit: contain;  
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    outline: none;
    box-shadow: none;
  }
`;



const ProfileImage = styled.img`
  height: 100%;         /* Wrapper 높이에 맞춤 */
  aspect-ratio: 1 / 1;  /* 항상 1:1 비율 */
  object-fit: cover;    /* 중앙 기준으로 잘림 */
  border-radius: 50%;   /* 원형 */
`;

const NickName = styled.div`
  height: 100%;          /* Wrapper 높이에 맞춤 */
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
  width: 100%
;
`


