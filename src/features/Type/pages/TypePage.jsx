import React from 'react'
import styled from 'styled-components'
import ProfileIcon from "../assets/ProfileIcon.png"

const TypePage = () => {
  return (
    <Container>
        <Icon src={ProfileIcon}/>
        <Text1>김연희님의 집콕 유형은 한뭉치에요.</Text1>
        <Text1>네뭉치는 집콕력이 보통이에요.</Text1>
        <Text1>취미 생활을 위한 외출은 가능하지만, <br/>타인과의 상호작용은 적어요</Text1>
        <Box>네뭉치는 타인과 상호작용하는 미션부터 시작해요</Box>
        <Text1>성공한 미션들이 쌓이면<br/>다음 뭉치가 될 수 있어요.</Text1>
        <Text1>마지막 단계는 솜뭉치에요.</Text1>
        <Text1>모든 유형의 미션을 받으며<br/>이불 밖으로 나가보여요 :)</Text1>
    </Container>
  )
}

export default TypePage;

const Container=styled.div`
    background-color: #ECEAFF;
    width: 100%;
    height: 100%;
    padding-bottom: 5rem;
    padding-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Icon=styled.img`
    width: 6rem;
`

const Text1=styled.p``

const Box=styled.div`
    background-color: white;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    border-radius: 59px;
`

