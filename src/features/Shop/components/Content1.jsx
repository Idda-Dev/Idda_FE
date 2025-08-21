import React from 'react'
import styled from 'styled-components'

const Content1 = ({ item }) => {
  return (
    <Wrapper>
      <Title>{item.storeName}</Title>
      <Content>{item.title}</Content>
      <Text>솜뭉치 {item.price}개</Text>
    </Wrapper>
  )
}

export default Content1;

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  height: 5rem;
  justify-content: space-between;
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
const Text=styled.p`
  font-size:0.9rem;
  font-weight: 600;
  margin: 0;
`