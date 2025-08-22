import React from 'react'
import styled from 'styled-components';
import StarIcon from "../assets/StarIcon.png";

const CandyCount = ({candy}) => {
  return (
    <Container>
        <Icon src={StarIcon}/>
        <Text>내가 모은 솜뭉치</Text>
        <Count>{candy}개</Count>
    </Container>
  )
}

export default CandyCount;

const Container=styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    height:2.6rem;
    width: 16.2rem;
    border-radius: 36px;
    z-index: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
const Icon=styled.img`
    width: 1.2rem;
    height: 1.2rem;
`

const Text=styled.p`
    margin: 0;
    color: #F2F2F2;
    font-size: 0.9rem;
    font-weight: 550;
`
const Count=styled.p`
    background-color: #ECEAFF;
    color: #2F0047;
    border-radius: 36px;
    margin: 0;
    padding: 0.1rem 0.7rem; 
    font-size: 0.8rem;
    font-weight: 550;
    display: inline-block;
    max-width: 25%; /* 부모 Container 안에서 최대 폭 */
    white-space: nowrap;
    overflow-x: auto;
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
`

