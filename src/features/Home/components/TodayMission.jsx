import React from 'react'
import styled from 'styled-components';
import StarIcon from "../assets/StarIcon.png"


const TodayMission = () => {
  return (
    <Wrapper>
        <Container>
            <Icon src={StarIcon} />
            <Title>미션</Title>
        </Container>
        <Content>내용</Content>
    </Wrapper>
  )
}

export default TodayMission;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 16.2rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: white;
  z-index: 2;
  border-radius: 0 0 12px 12px;
`;

const Container =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
    border-right: 1px solid black ;
    gap: 0.4rem;
`

const Icon=styled.img`
    height: 1rem;
`

const Title=styled.p`
    margin: 0;
    height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.8rem;
    font-weight: 550;
`

const Content=styled.p`
    margin: 0;
    width: 60%;
    height: 100%;
    padding-right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 0.8rem;
    font-weight: 550;
`
