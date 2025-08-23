import React from 'react'
import styled from 'styled-components';
import BorderIcon from "../assets/BorderIcon.png";

const Box = () => {
  return (
    <Container>
      <Icon src={BorderIcon}/>
    </Container>
  )
}

export default Box;

const Container = styled.div`
  background-color: transparent;
  width: 100%;
  height: 9%;
`
const Icon =styled.img`
  height: 100%;
  width: 100%;
`