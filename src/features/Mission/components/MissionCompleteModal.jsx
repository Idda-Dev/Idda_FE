// features/Mission/components/MissionCompleteModal.jsx
import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import CloseIcon from "../../../assets/CancleIcon.png"; // 닫기 아이콘 (있는 걸 재사용)
import MissionClearTag from "../assets/MissionClearTag.png";
import LeeSeoyoonFont from "../../../../public/fonts/이서윤체.ttf";

const MissionCompleteModal = ({ onClose, onGoBoard, onGoShop }) => {
  // 배경 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  return (
    <Overlay>
      <FontStyle />
      <Card>
        {/* 보라 라벨 + 말풍선 아이콘 영역은 간략화 */}
        <Badge src={MissionClearTag} />
        <CloseBtn type="button" onClick={onClose} aria-label="닫기">
          <img src={CloseIcon} alt="close" />
        </CloseBtn>

        <Title>솜뭉치 5개를 모았어요.</Title>
        <Sub>오늘 하루도 수고했어요 :) 내일 또 만나요!</Sub>

        <Btn onClick={onGoBoard}>게시판 구경가기</Btn>
        <Btn onClick={onGoShop}>상점 바로가기</Btn>
      </Card>
    </Overlay>
  );
};

export default MissionCompleteModal;

/* ===== styled ===== */

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'LeeSeoyoon';
    src: url(${LeeSeoyoonFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const Overlay = styled.div`
  position: absolute; /* 부모(Container) 기준 */
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Card = styled.div`
  position: relative;
  width: 315px;
  height: 362px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 36px;
  padding: 105px 35px 45px 35px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  text-align: center;
  font-family: "LeeSeoyoon";
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;

  img {
    width: 80%;
    object-fit: contain;
  }
`;

const Badge = styled.img`
  position: absolute;
  top: -30px;
  left: -40px;
  width: 70%;
`;

const Title = styled.div`
  display: inline-block;
  margin: 0px 0 10px;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.5px;
  border-bottom: 1px solid black;
`;

const Sub = styled.div`
  margin-bottom: 40px;
  color: #7f7f7f;
  font-size: 13px;
  font-weight: 400;
`;

const Btn = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 36px;

  background: var(--Background, #e8f0ff);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background: #e9efff;
  color: #000;

  outline: none;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  text-align: center;

  &:not(:last-of-type) {
    margin-bottom: 18px;
  }
`;

const Emoji = styled.span`
  font-size: 18px;
`;
