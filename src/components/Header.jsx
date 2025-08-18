import React from 'react';
import BackIcon from "../features/PostItem/assets/BackIcon.png";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = ({title,backPath}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath); // props로 받은 경로로 이동
    } else {
      navigate("/"); // 없으면 이전 페이지로
    }
  };

  return (
    <Container>
      <Back src={BackIcon} alt="뒤로가기" onClick={handleBack}/>
      <Title> {title}</Title>
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
  background-color: #E8F0FF;
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
`;

export default Header;
