import React from 'react'
import styled from 'styled-components'
import BackBt from "../assets/BackBt.png"
import GoBt from "../assets/GoBt.png"

const Content = () => {
  return (
    <Wrapper>
      <Icon src={BackBt} alt="back-button" onClick={() => console.log("뒤로 버튼 클릭")} />
      <Text>해당 사항에 체크해 주세요.</Text>
      <Icon src={GoBt} alt="go-button" onClick={() => console.log("다음 버튼 클릭")} />
    </Wrapper>
  )
}

export default Content

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  // 좌우 버튼 사이 텍스트 중앙
  gap:1rem;                 // 좌우 여백
`

const Icon = styled.img`   
  height: 30%;
  width: auto;   
  cursor: pointer;
`

const Text = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
`
