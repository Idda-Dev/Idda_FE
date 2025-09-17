import React from 'react'
import styled from 'styled-components'
import QuestionIcon from "../assets/QuestionIcon.png"

const LastPageContent = () => {
  return (
    <Wrapper>
        <Icon src={QuestionIcon}/>
        <Button>은둔 유형 확인하기</Button>
    </Wrapper>
  )
}

export default LastPageContent;

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Icon=styled.img`
    width: 5rem;
    height: auto;
`

const Button = styled.button`
    background-color: #2F0047; /* 보라색 */
    color: #fff;
    border: none;
    border-radius: 36px;
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;

    &:active {
        transform: scale(0.95); 
    }
`
