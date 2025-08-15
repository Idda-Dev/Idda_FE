// Calendar.jsx
import React from "react";
import styled from "styled-components";

const Calendar = ({ year, month, onDateClick, hide }) => {
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = prevLastDay.getDate();

  const blanks = Array(firstWeekDay)
    .fill(null)
    .map((_, i) => (i === firstWeekDay - 1 ? daysInPrevMonth : null));

  const daysArray = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  const nextMonthBlanks = 42 - (blanks.length + daysInMonth);
  const nextBlanks = Array(nextMonthBlanks).fill(null);

  const calendarCells = [...blanks, ...daysArray, ...nextBlanks];

  const isThisMonth = (index) =>
    index >= blanks.length && index < blanks.length + daysInMonth;

  const prevLastDayIndex = blanks.length - 1;

  const isPastDay = (day, index) => {
    let dateObj;
    if (index === prevLastDayIndex) dateObj = new Date(year, month - 1, day);
    else dateObj = new Date(year, month, day);

    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateObj < todayDate;
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isFutureDay = (day) => {
    const dateObj = new Date(year, month, day);
    return dateObj > new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <Grid>
      {calendarCells.map((day, idx) => {
        const type =
          isToday(day) ? "today" :
          isThisMonth(idx) && isPastDay(day, idx) ? "past" :
          isFutureDay(day) ? "future" : null;

        return (
          <DayCell key={idx} onClick={() => day && onDateClick(day, type)}>
            <StatusContainer>
              {day && (
                isToday(day) ? (
                  <CircleIcon color="#B1AAFF" hide={hide} />
                ) : idx === prevLastDayIndex ? (
                  <CircleIcon color="#f2f2f2" hide={hide} />
                ) : isThisMonth(idx) && <CircleIcon color="#CDDDFF" hide={hide} />
              )}
            </StatusContainer>
            <IconBackground>
              <DateText hide={hide}>{day}</DateText>
            </IconBackground>
          </DayCell>
        );
      })}
    </Grid>
  );
};

export default Calendar;

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
  width: ${({ hide }) => (hide ? "1.5rem" : "1.8rem")};
  height: ${({ hide }) => (hide ? "1.5rem" : "1.8rem")};
  background-color: ${({ color }) => color || "#CDDDFF"};
  border-radius: 50%;
  transition: all 0.2s ease;
`;

const IconBackground = styled.div`
  flex: 4.5 0 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.div`
  font-size: ${({ hide }) => (hide ? "0" : "0.9rem")};
  font-weight: 540;
  color: #A4A4A4;
  transition: font-size 0.2s ease;
`;
