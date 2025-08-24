import React from "react";
import styled from "styled-components";
import Star1 from "../assets/Star1.png";
import { Row } from "../../../components/CommonComponents";
Row;
const MissionHeader = ({ title }) => {
  return (
    <Container>
      <Title>
        <Row style={{ gap: "4px" }}>
          <img src={Star1} alt="Star" style={{ width: "15%" }} />
          {title}
        </Row>
      </Title>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 3.5rem;

  width: 100%;
  background-color: #e8f0ff;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 20px;
`;

export default MissionHeader;
