import React from 'react'
import styled from 'styled-components';
import LoginBg from "../assets/LoginBg.png"
import StartButtonImg from "../assets/StartButton.png"

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <Input placeholder="닉네임을 입력하세요" />
        <StartButton>
          <img src={StartButtonImg} alt="start-button" />
        </StartButton>
      </Content>
    </Container>
  )
}

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${LoginBg}) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;  
  padding-bottom: 10%;   
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* 인풋과 버튼 사이 간격 */
  width: 80%;
  max-width: 300px;
`

const Input = styled.input`
  width: 50%;
  padding: 0.6rem 0.8rem;
  font-size: 0.7rem;
  text-align: center;
  border: none;
  border-radius: 36px;
  outline: none;
  background-color: #B1AAFF;

  &::placeholder {
    color: white;
  }
`

const StartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  img {
    width: 55%;
    height: auto;
    transition: transform 0.1s ease-in-out;
  }

&:focus {
    outline: none;
  }

  &:active img {
    transform: scale(0.95); /* 눌렸을 때 살짝 작아짐 */
  }
`


