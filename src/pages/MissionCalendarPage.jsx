import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/useUserStore";

import Calendar from "../features/MissonCalendar/components/Calendar";
import CalendarModal from "../features/MissonCalendar/components/CalendarModal.jsx";
import Record from "../features/MissonCalendar/components/Record.jsx";
import NotyetInform from "../features/MissonCalendar/components/NotyetInform.jsx";

import PrevIcon from "../features/MissonCalendar/assets/PrevIcon.png";
import NextIcon from "../features/MissonCalendar/assets/NextIcon.png";
import CalendarBackIcon from "../features/MissonCalendar/assets/CalendarBackIcon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getYMDInKST = (date = new Date()) => {
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(date);
};

const toYMD_KST = (input) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const d = input instanceof Date ? input : new Date(input);
  return getYMDInKST(d);
};

const MissonCalendarPage = () => {
  const navigate = useNavigate();
  const userId = useUserStore((s) => s.userId);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [achievementDateSet, setAchievementDateSet] = useState(new Set());
  const [recordData, setRecordData] = useState(null);

  const handleBackIcon = () => navigate(-1);

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
  const isPast = selectedDateType === "past";
  const isTodaySelected = selectedDateType === "today";
  const showRecord = isPast || isTodaySelected;

  // 달성 기록 조회
  useEffect(() => {
    if (!userId) return;
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/${userId}/missions/achievements`,
          {
            params: {
              year: currentDate.getFullYear(),
              month: currentDate.getMonth() + 1,
            },
          }
        );
        const { dates } = res.data;
        const normalized = dates.map(toYMD_KST);
        setAchievementDateSet(new Set(normalized));
      } catch (err) {
        console.error("달성 기록 불러오기 실패:", err);
        setAchievementDateSet(new Set());
      }
    };
    fetchAchievements();
  }, [currentDate, userId]);

  // 특정 날짜 기록 조회
  const handleDateClick = async (day, type) => {
    if (!day || type === "future") return;

    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateStr = toYMD_KST(dateObj);

    if (type === "past" && !achievementDateSet.has(dateStr)) {
      setIsModalOpen(true);
      setSelectedDateType(null);
      setRecordData(null);
      return;
    }

    const todayStr = toYMD_KST(new Date());
    if (
      type === "today" &&
      dateStr === todayStr &&
      !achievementDateSet.has(todayStr)
    ) {
      setSelectedDateType("today");
      setRecordData(null);
      return;
    }

    setSelectedDateType(type);

    try {
      const res = await axios.get(
        `${BASE_URL}/api/users/${userId}/missions/posts`,
        {
          params: { date: dateStr },
        }
      );
      setRecordData({ ...res.data, date: dateStr });
    } catch (err) {
      if (err.response?.status === 404) {
        setRecordData(null);
        if (type === "past") setIsModalOpen(true);
      } else {
        console.error("기록 불러오기 실패", err);
        setRecordData(null);
      }
    }
  };

  return (
    <Container>
      <img
        src={CalendarBackIcon}
        style={{
          width: "10%",
          cursor: "pointer",
          position: "absolute",
          left: "10%",
          top: "5%",
        }}
        onClick={handleBackIcon}
      />
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

        <CalendarBox $isPast={showRecord}>
          <Calendar
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
            onDateClick={handleDateClick}
            hide={showRecord}
            achievementDateSet={achievementDateSet}
          />
        </CalendarBox>

        {showRecord && (
          <RecordBox $isPast={showRecord}>
            {recordData ? (
              <Record
                postId={recordData.postId}
                memberId={userId}
                title={recordData.title}
                content={recordData.content}
                photoUrl={recordData.photoUrl}
                date={recordData.date}
              />
            ) : (
              <div style={{ fontSize: "0.8rem", color: "#888" }}>
                {isTodaySelected ? (
                  <NotyetInform />
                ) : (
                  "해당 날짜에는 작성한 글이 없습니다."
                )}
              </div>
            )}
          </RecordBox>
        )}

        {isModalOpen && (
          <ModalBox>
            <CalendarModal
              isOpen={true}
              onClose={() => setIsModalOpen(false)}
            />
          </ModalBox>
        )}
        {!showRecord && <Massege>한 걸음, 두 걸음, 같이 걸어요.</Massege>}
      </ContentWrapper>
    </Container>
  );
};

export default MissonCalendarPage;

/* ================= styled ================= */
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  z-index: 10;
`;

const MonthBox = styled.div`
  position: relative;
  height: 100%;
  width: 8rem;
  flex-shrink: 0;
  border-radius: 36px;
  background-color: #b1aaff;
`;

const MonthLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: black;
  font-weight: 600;
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
  padding: ${({ $isPast }) => ($isPast ? "2rem 3rem 0.5rem 3rem" : "3rem")};
  width: ${({ $isPast }) => ($isPast ? "90%" : "95%")};
  max-width: 480px;
  height: ${({ $isPast }) => ($isPast ? "17rem" : "28rem")};
  display: flex;
  margin-top: 3rem;
  margin-bottom: ${({ $isPast }) => ($isPast ? "1rem" : "0")};
  justify-content: center;
  background-color: white;
`;

const RecordBox = styled.div`
  width: ${({ $isPast }) => ($isPast ? "66%" : "100%")};
  height:auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
`;

const Massege = styled.p`
  font-size: 0.8rem;
  color: #444444;
`;
