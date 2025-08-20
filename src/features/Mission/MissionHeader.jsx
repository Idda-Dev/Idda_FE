import React from "react";
import BackIcon from "../../features/PostItem/assets/BackIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Star1 from "./assets/Star1.png";
import { Row } from "../../components/CommonComponents";

const MissionHeader = ({ title }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Back src={BackIcon} alt="뒤로가기" onClick={handleBack} />
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

const Back = styled.img`
  position: absolute;
  left: 8%;
  height: 1.7rem;
  object-fit: contain;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 20px;
`;

export default MissionHeader;
