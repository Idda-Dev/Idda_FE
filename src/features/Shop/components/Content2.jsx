import React from 'react'
import styled from 'styled-components'

const Content2 = () => {
  return (
    <Wrapper>
        <Title>쿠폰이 발급됐어요!</Title>
        <Content>내 쿠폰함에서 확인 가능해요</Content>
    </Wrapper>
  )
}

export default Content2;

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    height: 5rem;
    justify-content: center;
    gap: 0.5rem;
`

const Title=styled.p`
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
`

const Content=styled.p`
    font-size:0.8rem;
    margin: 0;
`