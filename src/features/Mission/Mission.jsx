import React from "react";
import styled from "styled-components";
import Star1 from "./assets/Star1.png";
import CalendarIcon from "./assets/CalendarIcon.png";
import Card from "./assets/Card.png";
import { Row } from "../../components/CommonComponents";
import { useState } from "react";

const Mission = () => {
  const [selected, setSelected] = useState("");

  const options = ["잘 맞아요", "무난해요", "안 맞아요"];

  return (
    <MainContainer>
      <Row style={{ justifyContent: "space-between", marginBottom: "20px" }}>
        <Row style={{ gap: "10px" }}>
          <img src={Star1} alt="Star" style={{ width: "10%" }} />
          <TodayInfoBox>오늘의 미션</TodayInfoBox>
        </Row>
        <img
          src={CalendarIcon}
          alt="CalendarIcon"
          style={{ width: "10%", cursor: "pointer" }}
        />
      </Row>
      <ImageWrapper>
        <BackgroundImage src={Card} alt="카드" />
        <TextOverlayBold>동네 골목길 10분 걷기</TextOverlayBold>
        <TextOverlayRegular>중간에 돌아와도 괜찮아요</TextOverlayRegular>
        <TextOverlayRegular style={{ top: "48%" }}>
          중요한 건 오늘도 나왔다는 거에요
        </TextOverlayRegular>
        <CandyOverlay>사탕 5개</CandyOverlay>
      </ImageWrapper>
      <TastyQuestion>오늘 미션은 취향에 맞았나요?</TastyQuestion>
      <Row style={{ justifyContent: "space-between" }}>
        {options.map((option) => (
          <TastyOptionButton
            $active={selected === option}
            onClick={() => setSelected(option)}
          >
            {option}
          </TastyOptionButton>
        ))}
      </Row>
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
  padding: 5px 31px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  line-height: 20px; /* 153.846% */
  font-weight: bold;
  font-size: 13px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BackgroundImage = styled.img`
  display: block;
  width: 107%;
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
