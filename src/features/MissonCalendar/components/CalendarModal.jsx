import React from "react";
import styled from "styled-components";

import StarIcon from "../assets/StarIcon.png";
import DefaultMissionIcon from "../assets/DefaultMissionIcon.png";
import CancleIcon from "../../../assets/CancleIcon.png";

const CalendarModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ContentBox onClick={(e) => e.stopPropagation()}>
        <Star src={StarIcon} alt="Star" />
        <DefaultMission src={DefaultMissionIcon} alt="Default Mission" />
        <ContentText>
          {`모든 시도는 앞으로 나아가는 걸음이에요.\n 충분히 잘하고 있어요. :)`}
        </ContentText>
        <BackButtonWrapper>
          <BackButton src={CancleIcon} alt="back" onClick={onClose} />
        </BackButtonWrapper>
      </ContentBox>
    </Overlay>
  );
};

export default CalendarModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ContentBox = styled.div`
  padding: 0.8rem 1.5rem;
  width: 19%;
  border-radius: 16px;
  min-width: 250px;
  max-width: 80%;
  display: flex;
  flex-direction: column; /* 위에서 아래로 정렬 */
  justify-content: center;
  align-items: center;
  gap: 0.7rem; /* 요소 사이 간격 */
  background-color: #d1cdff;
`;

const Star = styled.img`
  margin-top: 0.2rem;
  width: 1rem;
  height: 1rem;
`;

const DefaultMission = styled.img`
  width: 100%; // 가로 10rem
  height: auto; // 원본 비율 유지
`;

const ContentText = styled.div`
  width: 100%;
  font-size: 0.76rem;
  color: #444444;
  text-align: center;
  letter-spacing: -0.5px;
  line-height: 1.7rem;
  text-decoration-line: underline;
  text-underline-offset: 0.4rem; /* 글자와 밑줄 사이 간격 */
  text-decoration-color: #444444; /* 밑줄 색상 */
  white-space: pre-line;
`;

const BackButton = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
`;

const BackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-bottom: 0.3rem;
  padding: 0;
`;
