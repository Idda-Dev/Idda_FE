import React, { useState } from 'react';
import styled from 'styled-components';
import CheckImg from '../assets/CheckIcon.png';      // 체크 이미지
import CheckboxBgImg from '../assets/Checkbox.png'; // 기본 박스 이미지

const ListItem = () => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked); // 클릭 시 상태 토글
  }

  return (
    <Wrapper>
      <Box onClick={handleClick}>
        {checked && <Check src={CheckImg} alt="checked" />}
      </Box>
      <Content>방에서 거의 나오지 않는다</Content>
    </Wrapper>
  )
}

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;  // Box와 Content 사이 간격
`

const Box = styled.button`
  width: 2rem;
  height: 2rem;
  background: url(${CheckboxBgImg}) no-repeat center center;
  background-size: cover;
  border: none;
  cursor: pointer;
  position: relative;  // 체크 이미지 위치를 위해
  padding: 0;
  outline: none;      

  &:focus {
    outline: none;  
  }
`


const Check = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 3rem;  // 체크 이미지 크기
  height: 3rem;
  pointer-events: none; // 클릭 이벤트는 Box에 전달
`

const Content = styled.p`
  margin: 0;
  font-size: 0.9rem;
`
