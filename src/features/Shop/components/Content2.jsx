import React from 'react'
import styled from 'styled-components'

// isSuccess prop을 받기
const Content2 = ({ isSuccess }) => {
  return (
    <Wrapper>
      {isSuccess ? (
        <>
          <Title>쿠폰이 발급됐어요!</Title>
          <Content>내 쿠폰함에서 확인 가능해요</Content>
        </>
      ) : (
        <>
          <Title>쿠폰 발급에 실패했어요ㅠ</Title>
          <Content>사탕을 더 모아볼까요?</Content>
        </>
      )}
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