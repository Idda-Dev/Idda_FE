import React from 'react';
import BackIcon from "../assets/BackIcon.png";
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Back src={BackIcon} alt="뒤로가기" />
      <Title> 다같이 한걸음</Title>
    </Container>
  );
};


const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
  background-color: #E8F0FF;
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
