import React, { useMemo } from "react";
import Star2 from "../assets/Star2.png";
import LoadingIcon from "../assets/LoadingIcon.png";
import { Column, Row } from "../../../components/CommonComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotyetInform = () => {
  const nav = useNavigate();

  // KST 기준 오늘 날짜를 "YYYY.M.D (요일)"로 반환
  const todayStr = useMemo(() => {
    const now = new Date();
    // KST로 변환
    const kst = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    const y = kst.getFullYear();
    const m = kst.getMonth() + 1; // 1~12
    const d = kst.getDate(); // 1~31
    const weekdayKor = ["일", "월", "화", "수", "목", "금", "토"][kst.getDay()];
    return `${y}.${m}.${d} (${weekdayKor})`;
  }, []);

  const handlerMoveMissionPage = () => {
    nav("/mission");
  };
  return (
    <div>
      <Wrapper>
        <Row style={{ justifyContent: "center", gap: "8px" }}>
          <img src={Star2} alt="보라별" style={{ width: "6%" }} />
          <TodayText>{todayStr}</TodayText>
        </Row>
        <LightPurpleBox>
          <Column style={{ gap: "10px", alignItems: "center" }}>
            아직 미션 인증을 하지 않았어요.
            <img src={LoadingIcon} alt="로딩중" style={{ width: "15%" }} />
          </Column>
        </LightPurpleBox>
        <GotoMissionButton onClick={handlerMoveMissionPage}>
          미션 인증하러 가기
        </GotoMissionButton>
      </Wrapper>
    </div>
  );
};

export default NotyetInform;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const TodayText = styled.div`
  color: #444;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const LightPurpleBox = styled.div`
  display: flex;
  width: 100%;
  height: 142px;
  padding: 50px 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: #eceaff;
  color: #444;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
`;

const GotoMissionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 288px;
  height: 35px;
  border-radius: 16px;
  background: #2f0047;
  box-shadow: 6px 4px 20px 0 rgba(0, 0, 0, 0.09);
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 70px;
  cursor: pointer;
`;
