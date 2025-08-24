import React from "react";
import BackIcon from "../features/PostItem/assets/BackIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Header = ({ title, backPath, backgroundColor, color, backIcon }) => {
  const navigate = useNavigate();

  const handleBack = () => {
  if (backPath !== undefined) {
    const path = backPath === "-1" ? -1 : backPath;
    navigate(path);
  } else {
    navigate("/");
  }
};


  return (
    <Container bgColor={backgroundColor}>
      <Back src={backIcon || BackIcon} alt="뒤로가기" onClick={handleBack} />
      <Title fontColor={color}>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 3.5rem;
  width: 100%;
  background-color: ${(props) => props.bgColor || "#e8f0ff"};
  box-sizing: border-box;
`;

const Back = styled.img`
  position: absolute;
  left: 8%;
  height: 1.7rem;
  object-fit: contain;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 20px;
  color: ${(props) => props.fontColor || "#000000"};
`;

export default Header;
