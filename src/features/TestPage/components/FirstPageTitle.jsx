import React from 'react'
import styled from 'styled-components'
import BgImg from "../assets/FirstPageTitle.png"

const FirstPageTitle = () => {
  return (
    <Container>
      <Background src={BgImg} />
      <Title>외출 빈도</Title>
    </Container>
  )
}

export default FirstPageTitle;

const Container = styled.div`
  position: relative;  
  display: inline-block; 
`

const Background = styled.img`
  width: 47%;
  height: auto;
`

const Title = styled.p`
  position: absolute;
  top: 13%;    
  left: 54%;   
  transform: translate(-50%, -50%); 
  color: #2F0047;
  font-size: 1.3rem;
`
