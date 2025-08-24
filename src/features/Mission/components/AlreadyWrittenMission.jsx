// src/features/Mission/components/AlreadyWrittenMission.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// 캘린더에서 쓰는 카드 그대로 재사용
import Record from "../../MissonCalendar/components/Record.jsx";
import NotyetInform from "../../MissonCalendar/components/NotyetInform.jsx";

/**
 * 오늘 날짜 기준(Asia/Seoul) YYYY-MM-DD 포맷을 안전하게 생성
 * toISOString()을 그대로 쓰면 UTC 기준으로 -9h 어긋날 수 있어 반드시 타임존 지정 Formatter 사용
 */
const getYMDInKST = (date = new Date()) => {
  // 'sv-SE'는 YYYY-MM-DD 형식으로 출력
  const fmt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(date); // e.g., "2025-08-24"
};

/**
 * AlreadyWrittenMission
 * - 오늘 날짜 기준으로 /missions/posts?date=YYYY-MM-DD 를 조회하여
 *   이미 작성된 '오늘' 인증 게시글을 Record 카드로 보여준다.
 *
 * props:
 *  - userId?: number        // 기본 1
 *  - baseUrl?: string       // 기본 import.meta.env.VITE_API_BASE_URL
 *  - dateOverride?: string  // "YYYY-MM-DD" (옵션: 특정 날짜 강제 조회용)
 *  - onReload?: () => void  // (옵션) 부모쪽에서 재조회 트리거 시 호출하고 싶을 때
 */
const AlreadyWrittenMission = ({
  userId = 1,
  baseUrl = import.meta.env.VITE_API_BASE_URL,
  dateOverride, // 없으면 오늘(KST)
  onReload,
}) => {
  const [loading, setLoading] = useState(true);
  const [recordData, setRecordData] = useState(null);
  const [error, setError] = useState("");

  const targetDate = dateOverride ?? getYMDInKST();

  const fetchTodayPost = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${baseUrl}/api/users/${userId}/missions/posts`,
        { params: { date: targetDate } }
      );

      // res.data 예시:
      // { postId, title, content, photoUrl, ... }
      setRecordData({ ...res.data, date: targetDate });
    } catch (e) {
      if (e.response?.status === 404) {
        // 오늘 인증 데이터가 아직 없을 때
        setRecordData(null);
      } else {
        setError(
          "오늘 인증 게시글을 불러오지 못했어요. 잠시 후 다시 시도해주세요."
        );
        console.error("AlreadyWrittenMission fetch error:", e);
        setRecordData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, userId, dateOverride]);

  return (
    <Wrapper>
      {loading && <DimText>불러오는 중...</DimText>}

      {!loading && error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <>
          {recordData ? (
            <Record
              postId={recordData.postId}
              memberId={userId}
              title={recordData.title}
              content={recordData.content}
              photoUrl={recordData.photoUrl}
              date={recordData.date} // "YYYY-MM-DD"
            />
          ) : (
            // 혹시 alreadyVerified=true인데도 404가 뜨는 등 경합 상황 대비
            <NotyetInform />
          )}
        </>
      )}

      {/* 필요 시 외부에서 재조회 트리거할 수 있는 버튼(옵션) */}
      {onReload && (
        <ReloadArea>
          <ReloadButton
            type="button"
            onClick={() => {
              fetchTodayPost();
              onReload?.();
            }}
          >
            다시 불러오기
          </ReloadButton>
        </ReloadArea>
      )}
    </Wrapper>
  );
};

export default AlreadyWrittenMission;

const Wrapper = styled.div`
  width: 100%;
  min-height: 17rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Header = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #222;
`;

const DimText = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const ErrorText = styled.div`
  font-size: 0.9rem;
  color: #c53030;
`;

const ReloadArea = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0.5rem;
`;

const ReloadButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: #eceaff;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: transform 0.08s ease;
  &:active {
    transform: scale(0.98);
  }
`;
