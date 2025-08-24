import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Calendar from "../features/MissonCalendar/components/Calendar";
import TabBar from "../components/TabBar.jsx";

import CalendarModal from "../features/MissonCalendar/components/CalendarModal.jsx";

import PurpleMissionIcon from "../assets/PurpleMissionIcon.png";
import PrevIcon from "../features/MissonCalendar/assets/PrevIcon.png";
import NextIcon from "../features/MissonCalendar/assets/NextIcon.png";
import CalendarBackIcon from "../features/MissonCalendar/assets/CalendarBackIcon.png";

import Record from "../features/MissonCalendar/components/Record.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NotyetInform from "../features/MissonCalendar/components/NotyetInform.jsx";

// ui보려고 캘린더 크기조절되는거 걍 과거현재미래로 나눠둠 !

const MissonCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateType, setSelectedDateType] = useState(null);

  const nav = useNavigate();

  const location = useLocation();

  // ⬇️ MissionPage에서 넘긴 값 (없으면 false)
  const initialHasTodayRecord = location.state?.hasTodayRecord ?? false;

  // 오늘 글 여부
  const [hasTodayRecord, setHasTodayRecord] = useState(initialHasTodayRecord);

  // ⬇️ 추가: 모달 오픈 상태 (미션 안 한 '과거' 날짜 클릭 시만 사용)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackIcon = () => {
    nav(-1);
  };

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
  const showRecord = isPast || isTodaySelected; // 과거, 오늘 확인용

  // API
  const [achievementDateSet, setAchievementDateSet] = useState(new Set());
  const BASE_URL = import.meta.env.VITE_API_BASE_URL; // VITE_API_BASE_URL 불러오기
  const user_id = 1; // user_id 1로 고정

  // 유틸: 어떤 입력이 오든 KST 기준 YYYY-MM-DD 문자열로 변환
  const toYMD_KST = (input) => {
    // 이미 'YYYY-MM-DD'면 그대로 사용 (타임존 영향 없음)
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;

    const d = new Date(input); // ISO 등은 여기서 로컬(KST)로 읽힘
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // 1. 미션 달성일 나비 아이콘 렌더링
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/${user_id}/missions/achievements`,
          {
            params: {
              year: currentDate.getFullYear(),
              month: currentDate.getMonth() + 1,
            },
          }
        );

        // (예상) res.data = { dates: ["2025-08-18", "2025-08-20T12:34:56Z", ...] }
        const { dates } = res.data;

        // 모두 KST기준 YYYY-MM-DD 문자열로 통일
        const normalized = dates.map(toYMD_KST);
        setAchievementDateSet(new Set(normalized));
      } catch (err) {
        console.error("달성 기록 불러오기 실패:", err);
        setAchievementDateSet(new Set());
      }
    };

    fetchAchievements();
  }, [currentDate, BASE_URL]);

  // 2. 달력에서 작성한 글 조회
  const [recordData, setRecordData] = useState(null); // 기록 데이터 저장

  const handleDateClick = async (day, type) => {
    if (!day) return;

    // 미래 날짜는 아무 동작도 하지 않음
    if (type === "future") return;

    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateStr = toYMD_KST(dateObj);

    // 과거 + 미달성(나비 없음) → 모달만 오픈, API 호출 스킵
    if (type === "past" && !achievementDateSet.has(dateStr)) {
      setIsModalOpen(true);
      setSelectedDateType(null);
      setRecordData(null);
      return;
    }

    // 오늘 + 미달성 → API 호출 스킵하고 메시지 표시용 상태만
    const todayStr = toYMD_KST(new Date());
    if (
      type === "today" &&
      dateStr === todayStr &&
      !(hasTodayRecord || achievementDateSet.has(todayStr))
    ) {
      setSelectedDateType("today");
      setRecordData(null); // 메시지 표시용
      return;
    }

    // 여기서부터는 '오늘(달성됨)' 또는 '과거(달성됨)'만 API 호출
    setSelectedDateType(type);

    try {
      const res = await axios.get(
        `${BASE_URL}/api/users/${user_id}/missions/posts`,
        { params: { date: dateStr } }
      );
      setRecordData({ ...res.data, date: dateStr });
    } catch (err) {
      if (err.response?.status === 404) {
        // 혹시 서버 데이터와 불일치 시에도 콘솔 소음 없이 안전 처리
        setRecordData(null);
        // 과거인데 서버에 기록이 없으면 UX 통일 위해 모달
        if (type === "past") setIsModalOpen(true);
      } else {
        console.error("기록 불러오기 실패", err);
        setRecordData(null);
      }
    }
  };

  // 📌 마운트 시 오늘 기록도 확인 (hasTodayRecord가 true일 때만!)
  useEffect(() => {
    if (!hasTodayRecord) return; // ⬅️ 가드: 오늘 글이 없다고 알면 API 호출 자체를 스킵

    const checkTodayRecord = async () => {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/${user_id}/missions/posts`,
          { params: { date: todayStr } }
        );
        setRecordData({ ...res.data, date: todayStr });
        setHasTodayRecord(true); // 유지
      } catch (err) {
        if (err.response?.status === 404) {
          setHasTodayRecord(false);
        } else {
          console.error("오늘 기록 불러오기 실패", err);
        }
      }
    };

    checkTodayRecord();
  }, [BASE_URL, hasTodayRecord]); // ⬅️ hasTodayRecord가 true일 때만 동작

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
            hide={showRecord} // 글씨와 원 크기 제어
            achievementDateSet={achievementDateSet}
            hasTodayRecord={hasTodayRecord}
          />
        </CalendarBox>
        {showRecord && (
          <RecordBox $isPast={showRecord}>
            {recordData ? (
              <Record
                postId={recordData.postId}
                memberId={user_id}
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
      <TabBar icons={{ mission: PurpleMissionIcon }} />
    </Container>
  );
};

export default MissonCalendarPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 1rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 6rem; /* 상단에서 1rem */
  left: 50%; /* 화면 가로 중앙 */
  transform: translateX(-50%); /* 중앙 정렬 보정 */

  width: 60%;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  z-index: 10; /* 다른 요소 위에 표시 */
`;

const MonthBox = styled.div`
  position: relative;
  height: 100%;
  width: 8rem;
  flex-shrink: 0;
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
  font-weight: 700;
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
  height: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  position: absolute; // fixed 대신 absolute
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
