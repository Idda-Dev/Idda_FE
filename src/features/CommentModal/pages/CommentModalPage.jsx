import React from 'react';
import styled from 'styled-components';

const CommentModalPage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ButtonGroup>
          <ActionButtonTop>수정</ActionButtonTop>
          <Divider />
          <ActionButtonBottom>삭제</ActionButtonBottom>
        </ButtonGroup>
        <BottomButton onClick={onClose}>취소</BottomButton>
      </Modal>
    </Overlay>
  );
};

export default CommentModalPage;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
`;

const Modal = styled.div`
  width: 280px;
  border-radius: 16px; /* 모달 전체 바깥 둥근 모서리 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButtonTop = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  background-color: #fff;
  cursor: pointer;
  color: #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    background-color: #F0F0F0;
  }

  &:focus {
    outline: none;
  }
`;

const ActionButtonBottom = styled.button`
  width: 100%;
  padding: 0.75rem 0;
  background-color: #fff;
  cursor: pointer;
  color: #000;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  &:hover {
    background-color: #F0F0F0;
  }

  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #6F69B0;
`;

const BottomButton = styled.button`
  margin: 1rem 0 1rem 0;
  padding: 0.75rem 0;
  width: 100%;
  border: none;
  border-radius: 16px;
  background-color: #fff;
  color: #6F69B0;
  cursor: pointer;

  &:hover {
    background-color: #F0F0F0;
  }

  &:focus {
    outline: none;
  }
`;
