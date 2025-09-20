import React, { useState } from 'react';
import styled from 'styled-components';
import CheckImg from '../assets/CheckIcon.png';      
import CheckboxBgImg from '../assets/Checkbox.png'; 

const ListItem = ({ content }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <Wrapper>
      <Box onClick={handleClick}>
        {checked && <Check src={CheckImg} alt="checked" />}
      </Box>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Box = styled.button`
  width: 2rem;
  height: 2rem;
  background: url(${CheckboxBgImg}) no-repeat center center;
  background-size: cover;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;
  outline: none;

  &:focus {
    outline: none;  
  }
`;

const Check = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 3rem;
  height: 3rem;
  pointer-events: none;
`;

const Content = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-align: start;
`;
