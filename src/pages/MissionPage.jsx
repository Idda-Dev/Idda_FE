// MissonPage.jsx
import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "../features/MissonCalendar/components/Calendar";
import TabBar from "../components/TabBar.jsx";

import CalendarModal from "../features/MissonCalendar/components/CalendarModal.jsx";

import PupleMissionIcon from "../assets/PupleMissionIcon.png";
import PrevIcon from "../features/MissonCalendar/assets/PrevIcon.png";
import NextIcon from "../features/MissonCalendar/assets/NextIcon.png";

import Photo from "../features/PostItem/assets/ProfileIcon.png";

// ui보려고 캘린더 크기조절되는거 걍 과거현재미래로 나눠둠 !

const MissonPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);

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

  const handleDateClick = (day, type) => {
    setSelectedDateType(type);
  };

  const isPast = selectedDateType === "past";

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

        <CalendarBox isPast={isPast}>
          <Calendar
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
            onDateClick={handleDateClick}
            hide={isPast} // 글씨와 원 크기 제어
          />
        </CalendarBox>

        {isPast && (
          <PhotoBox isPast={isPast}>
            <img
              src={Photo}
              alt="미션 사진"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </PhotoBox>
        )}

        {selectedDateType === "future" && (
          <ModalBox>
              <CalendarModal isOpen={true} onClose={() => setSelectedDateType(null)}/>
          </ModalBox>
        )}

        {!isPast && <Massege>한 걸음, 두 걸음, 같이 걸어요.</Massege>}
      </ContentWrapper>

      <TabBar icons={{ mission: PupleMissionIcon }} />
    </Container>
  );
};

export default MissonPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 2.5rem);
  
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
  background-color: #b1aaff;
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
  font-size: 0.9rem;
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
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const PrevButton = styled(ArrowButton)``;
const NextButton = styled(ArrowButton)``;

const CalendarBox = styled.div`
  padding: 3rem;
  width: ${({ isPast }) => (isPast ? "90%" : "100%")};
  max-width: 480px;
  height: ${({ isPast }) => (isPast ? "21rem" : "30rem")};
  display: flex;
  justify-content: center;
  background-color: white;
`;

const PhotoBox = styled.div`
  width: ${({ isPast }) => (isPast ? "70%" : "100%")};
  height: 10rem;
  background-color: #eee;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: absolute;       // fixed 대신 absolute
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
`;

const Massege = styled.p`
  font-size: 9px;
  color: #444444;
`;
