import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Content1 from './Content1';
import Content2 from './Content2';

const ShopModal = ({ isOpen, onClose }) => {
  const [clicked, setClicked] = useState(false);

  // 모달 열릴 때마다 클릭 상태 초기화
  useEffect(() => {
    if (isOpen) setClicked(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClickConfirm = () => {
    console.log("확인 클릭!");
    setClicked(true);
  };

  const handleClickComplete = () => {
    console.log("완료 클릭!");
    onClose(); // 모달 닫기
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {clicked ?  <Content2/>: <Content1/>}
        {!clicked ? (
          <Button onClick={handleClickConfirm}>구매하기</Button>
        ) : (
          <Button onClick={handleClickComplete}>내 쿠폰함 가기</Button>
        )}
      </ModalBox>
    </Overlay>
  );
};

export default ShopModal;

// --- 스타일 컴포넌트 ---
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 16rem;
  height: 13rem;
  background-color: #D1CDFF;
  border-radius: 16px;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #B1AAFF;
  color: black;
  border: none;
  border-radius: 16px;
  font-size: 0.8rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus { outline: none; }
`;
