import React from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "../../../components/CommonComponents";
import styled from "styled-components";
import Star1 from "../assets/Star1.png";
import CalendarIcon from "../assets/CalendarIcon.png";
import MissionCard from "../assets/MissionCard.png";
import ReMissionIcon from "../assets/ReMissionIcon.png";

const TodayMission = ({
  content,
  missionComment,
  onRefresh,
  isRefreshing,
  alreadyVerified,
  userId,
}) => {
  // 미션 달력으로 이동
  const nav = useNavigate();

  const handleMissionCalendarPage = () => {
    nav("/mission/calendar", {
      state: { hasTodayRecord: !!alreadyVerified, userId: userId },
    });
  };

  return (
    <div>
      <Row style={{ justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <TitleBox>
          <img src={Star1} alt="Star" style={{ width: "20%" }} />
          오늘의 미션
        </TitleBox>
        <img
          src={CalendarIcon}
          alt="CalendarIcon"
          style={{ width: "12%", cursor: "pointer" }}
          onClick={handleMissionCalendarPage}
        />
      </Row>
      <ImageWrapper>
        <BackgroundImage src={MissionCard} alt="카드" />
        {/* ✅ 새로고침 버튼: 아직 인증 안 했을 때만 보이게 */}
        {!alreadyVerified && (
          <img
            src={ReMissionIcon}
            alt="새 미션 받기"
            title={isRefreshing ? "새 미션 불러오는 중..." : "새 미션 받기"}
            style={{
              position: "absolute",
              top: "12%",
              left: "88%",
              width: "6%",
              cursor: isRefreshing ? "not-allowed" : "pointer",
              opacity: isRefreshing ? 0.6 : 1,
            }}
            onClick={isRefreshing ? undefined : onRefresh}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (!isRefreshing && (e.key === "Enter" || e.key === " ")) {
                onRefresh();
              }
            }}
          />
        )}
        <TextOverlayBold>{content}</TextOverlayBold>
        <TextOverlayRegular>{missionComment}</TextOverlayRegular>
        <CandyOverlay>15개</CandyOverlay>
      </ImageWrapper>
    </div>
  );
};

export default TodayMission;

const TitleBox = styled.div`
  border-radius: 36px;
  background: #fff;
  box-shadow: -10px 0 20px 0 rgba(0, 0, 0, 0.06);
  width: 7.5rem;
  height: 2rem;
  padding: 5px 15px 5px 5px;
  justify-content: center;
  align-items: center;

  display: flex;
  gap: 6px;
  flex-shrink: 0;
  font-weight: bold;
  font-size: 13px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BackgroundImage = styled.img`
  display: block;
  width: 106%;
  height: auto;
`;

// 카드 위 오버레이 관련
const TextOverlayBold = styled.p`
  width: 100%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #fff;
  font-size: 17.5px;
  font-weight: 600;
`;

const TextOverlayRegular = styled.p`
  width: 100%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #c4c4c4;
  font-size: 10px;
  font-weight: 400;
  white-space: pre-line;
`;

const CandyOverlay = styled.div`
  width: 5rem;
  height: 2rem;
  position: absolute;
  top: 74%;
  left: 77%;
  font-size: 12px;
  font-weight: 500;
`;
