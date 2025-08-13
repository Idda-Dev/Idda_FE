import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "../features/MissonCalendar/components/Calendar";
import TabBar from "../components/TabBar.jsx";

import PupleMissionIcon from "../assets/PupleMissionIcon.png";
import PrevIcon from "../features/MissonCalendar/assets/PrevIcon.png";
import NextIcon from "../features/MissonCalendar/assets/NextIcon.png";



const MissonPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthLabel = `${currentDate.getMonth() + 1}월`;

  return (
    <Container>
      <ContentWrapper>
        <Wrapper>
          <PrevButton onClick={handlePrevMonth} aria-label="이전 달">
            <Arrow src={PrevIcon} alt="이전 달" />
          </PrevButton>
          <MonthBox>
            <MonthLabel>{monthLabel}</MonthLabel>
          </MonthBox>
          <NextButton onClick={handleNextMonth} aria-label="다음 달">
            <Arrow src={NextIcon} alt="다음 달" />
          </NextButton>
        </Wrapper>

        <CalendarBox>
          <Calendar
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
          />
        </CalendarBox>
        <Massege>한 걸음, 두 걸음, 같이 걸어요.</Massege>
      </ContentWrapper>

      <TabBar icons={{ mission : PupleMissionIcon }} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative; 
`;

const ContentWrapper = styled.div`
  height: calc(100% - 2.5rem); /* 탭바 높이 제외 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const MonthBox = styled.div`
  position: relative;
  height: 100%;
  width: 35%;
  aspect-ratio: 55 / 13;
  border-radius: 36px;
  background-color: #B1AAFF;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  user-select: none;
`;

const MonthLabel = styled.div`
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: black;
  pointer-events: none;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  user-select: none;
  padding: 0;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }

`;



const Arrow = styled.img`
  width: 70%;       /* 버튼 안에서 비율 조절 */
  height: 70%;
  object-fit: contain;
`;


const PrevButton = styled(ArrowButton)`
  background-color: transparent;
`;

const NextButton = styled(ArrowButton)`
  background-color: transparent;
`;

const CalendarBox = styled.div`
  padding: 3rem;
  width: 100%;
  max-width: 480px;
  height: 30rem;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const Massege = styled.p`
  font-size: 9px;
  color: #444444;
`;



export default MissonPage;
