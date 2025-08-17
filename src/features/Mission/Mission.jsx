import React from "react";
import styled from "styled-components";
import Star1 from "./assets/Star1.png";
import CalendarIcon from "./assets/CalendarIcon.png";
import Card from "./assets/Card.png";
import { Row } from "../../components/CommonComponents";
import { useState, useRef } from "react";
import ReverseCard from "./assets/ReverseCard.png";
import PlusButton from "./assets/PlusButton.png";

const Mission = () => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const [file, setFile] = useState(null); // 사진 첨부
  const [note, setNote] = useState(""); // 글 입력

  const isReady = !!(file && note.trim()); // ✅ 세 조건 모두 충족?

  return (
    <MainContainer>
      <Row style={{ justifyContent: "space-between", marginBottom: "20px" }}>
        <TodayInfoBox>
          <img src={Star1} alt="Star" style={{ width: "20%" }} />
          오늘의 미션
        </TodayInfoBox>
        <img
          src={CalendarIcon}
          alt="CalendarIcon"
          style={{ width: "12%", cursor: "pointer" }}
        />
      </Row>
      <ImageWrapper>
        <BackgroundImage src={Card} alt="카드" />
        <TextOverlayBold>동네 골목길 10분 걷기</TextOverlayBold>
        <TextOverlayRegular>중간에 돌아와도 괜찮아요.</TextOverlayRegular>
        <TextOverlayRegular style={{ top: "48%" }}>
          중요한 건 오늘도 나왔다는 거에요.
        </TextOverlayRegular>
        <CandyOverlay>사탕 5개</CandyOverlay>
      </ImageWrapper>

      <Row style={{ justifyContent: "space-between", marginBottom: "20px" }}>
        <Row style={{ gap: "10px" }}>
          <img src={Star1} alt="Star" style={{ width: "10%" }} />
          <TodayInfoBox>오늘의 한줄</TodayInfoBox>
        </Row>
      </Row>
      <ImageWrapper>
        <BackgroundImage2 src={ReverseCard} alt="리버스카드" />
        <TextOverlayLight>사진을 첨부해 주세요.</TextOverlayLight>
        <OverlayPlusButton
          src={PlusButton}
          alt="추가버튼"
          onClick={handleImageClick}
        />
        <HiddenFileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <OverlayTextBox
          placeholder={`미션하면서 스친 생각이나 기분을 기록해주세요.`}
          value={note} // ✅ 상태 바인딩
          onChange={(e) => setNote(e.target.value)} // ✅ 입력 감지
        />
      </ImageWrapper>
      <ButtonRow>
        <ActionButton disabled={!isReady} $active={isReady}>
          인증하고 사탕받기
        </ActionButton>
      </ButtonRow>
    </MainContainer>
  );
};

export default Mission;

const MainContainer = styled.div`
  padding: 3rem;
`;

const TodayInfoBox = styled.div`
  border-radius: 36px;
  background: #fff;
  box-shadow: -10px 0 20px 0 rgba(0, 0, 0, 0.06);
  min-width: 120px;
  height: 30px;
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

const BackgroundImage2 = styled.img`
  display: block;
  width: 102%;
  height: auto;
`;

const TextOverlayBold = styled.p`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #000;
  font-size: 16px;
  font-weight: 600;
`;

const TextOverlayRegular = styled.p`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #000;
  font-size: 10px;
  font-weight: 400;
`;

const CandyOverlay = styled.div`
  width: 88px;
  height: 30px;
  position: absolute;
  top: 75%;
  left: 67.5%;
  font-size: 10px;
  font-weight: 400;
`;

const TastyQuestion = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin: 15px 0px;
`;

const TastyOptionButton = styled.div`
  width: 85px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 36px;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;

  background: ${({ $active }) => ($active ? "#b6aaff" : "#d9d9d9")};
  color: black;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #c2c2c2;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const TextOverlayLight = styled.div`
  position: absolute;
  top: 10%;
  left: 33%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #7f7f7f;
  font-size: 12px;
  font-weight: 400;
`;

const OverlayPlusButton = styled.img`
  position: absolute;
  width: 35%;
  top: 12%;
  left: 85%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  color: #000;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const OverlayTextBox = styled.textarea`
  position: absolute;
  width: 35%;
  top: 25%;
  left: 3.5%;
  padding: 25px;
  border-radius: 16px;
  background: var(--M3, #eceaff);
  box-shadow: 6px 0 20px 0 rgba(0, 0, 0, 0.02);
  width: 275px;
  height: 128.938px;
  flex-shrink: 0;
  outline: none; /* 기본 포커스 아웃라인 제거 */
  resize: none; /* 크기 조절 비활성화 */
  border: none;
  font-size: 9px;

  &::placeholder {
    color: #7f7f7f;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

const ActionButton = styled.div`
  display: flex; /* flex로 변경 */
  align-items: center; /* 세로 중앙 */
  justify-content: center; /* 가로 중앙 */
  width: 185px;
  height: 30px;
  border-radius: 36px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  /* 배경/글자색 전환 (왼쪽→오른쪽 버튼 느낌) */
  background: ${({ $active }) => ($active ? "#B1AAFF" : "#ECEAFF")};
  color: ${({ $active }) => ($active ? "#fff" : "#222")};

  /* 활성화일 때만 살짝 그림자 */
  box-shadow: ${({ $active }) =>
    $active ? "0 10px 24px rgba(0,0,0,.12)" : "0 6px 16px rgba(0,0,0,.06)"};

  /* 비활성일 땐 클릭 막기(의도치 않은 제출 방지) */
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
