import React from "react";
import styled from "styled-components";
import Star1 from "./assets/Star1.png";
import CalendarIcon from "./assets/CalendarIcon.png";
import { Row } from "../../components/CommonComponents";

const Mission = () => {
  return (
    <MainContainer>
      <Row>
        <Row style={{ gap: "9px" }}>
          <img src={Star1} alt="Star" style={{ minWidth: "16px" }} />
          <TodayInfoBox>오늘의 미션</TodayInfoBox>
        </Row>
        <img
          src={CalendarIcon}
          alt="CalendarIcon"
          style={{ minWidth: "1.5rem" }}
        />
      </Row>
    </MainContainer>
  );
};

export default Mission;

const MainContainer = styled.div`
  padding: 1rem;
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
`;
