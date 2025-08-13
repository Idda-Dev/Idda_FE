import React from "react";
import styled from "styled-components";


const Calendar = ({ year, month }) => {
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0); 
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = prevLastDay.getDate();

  // 이전달 마지막날만 숫자 보이게 처리
  const blanks = Array(firstWeekDay)
    .fill(null)
    .map((_, i) => (i === firstWeekDay - 1 ? daysInPrevMonth : null));

  const daysArray = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  const nextMonthBlanks = 42 - (blanks.length + daysInMonth);
  const nextBlanks = Array(nextMonthBlanks).fill(null);

  const calendarCells = [...blanks, ...daysArray, ...nextBlanks];



  // 이번달 날짜 범위 체크
  const isThisMonth = (index) =>
    index >= blanks.length && index < blanks.length + daysInMonth;

  // 이전달 마지막 날 index
  const prevLastDayIndex = blanks.length - 1;

  const isPastDay = (day, index) => {
    let dateObj;

    if (index === prevLastDayIndex) {
      // 이전달 마지막 날: 이전 달 year, month로 날짜 생성
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(year, month, day);
    }

    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return dateObj < todayDate;
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  // 당일 설정

  const isFutureDay = (day) => {
    const dateObj = new Date(year, month, day);
    return dateObj > new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  //미래설정
  
  return (
  <Grid>
    {calendarCells.map((day, idx) => {

      return (
        <DayCell key={idx}>
          <StatusContainer>
            {day && (
              // 오늘 날짜
              isToday(day) ? (
                <CircleIcon color="#B1AAFF" /> // 빨간색
              ) : (
                // 이전달 마지막 날
                idx === prevLastDayIndex ? (
                  <CircleIcon color="#f2f2f2" /> // 회색
                ) : (
                  // 이번달 과거 날짜
                  isThisMonth(idx) && <CircleIcon color="#CDDDFF" />
                )
              )
            )}
          </StatusContainer>
          <IconBackground>
            <DateText>{day}</DateText>
          </IconBackground>
        </DayCell>
      );
    })}
  </Grid>
);
};

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  row-gap: 7px;
`;

const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
`;

const StatusContainer = styled.div`
  flex: 5.5 0 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px; 
`;

const CircleIcon = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${({ color }) => color || "#CDDDFF"};
  border-radius: 50%;
`;


const IconBackground = styled.div`
  flex: 4.5 0 0;
  background-color: white; 
  background-image: none;   
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;



const DateText = styled.div`
  font-size: 0.9rem;
  font-weight: 540;
  color: ${({ isLastDay }) => (isLastDay ? "#D9D9D9" : "#A4A4A4")};
  position: relative;
`;



export default Calendar;
