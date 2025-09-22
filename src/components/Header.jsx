import React from "react";
import BackIcon from "../features/PostItem/assets/BackIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ title, backgroundColor, color, backIcon, userId, backPath }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof backPath === "function") {
      // 함수면 그대로 실행
      backPath();
    } else if (backPath !== undefined) {
      // 문자열/숫자 경로 또는 -1 처리
      const path = backPath === "-1" ? -1 : backPath;
      if (path === -1) {
        // 브라우저 뒤로가기
        navigate(-1);
      } else {
        // 경로 이동 시 userId 전달
        navigate(path, { state: { userId } });
      }
    } else {
      // 기본 루트 이동 시 userId 전달
      navigate("/", { state: { userId } });
    }
  };

  return (
    <Container $bgColor={backgroundColor}>
      <Back src={backIcon || BackIcon} alt="뒤로가기" onClick={handleBack} />
      <Title $fontColor={color}>{title}</Title>
    </Container>
  );
};

export default Header;

// Styled Components
const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 3.5rem;
  width: 100%;
  background-color: ${(props) => props.$bgColor || "#e8f0ff"};
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
  color: ${(props) => props.$fontColor || "#000000"};
`;
