import React from "react";
import styled from "styled-components";
import StarIcon from "../assets/StarIcon.png"

const InfoModal = ({ onClose }) => {
  return (
    <Overlay>
      <ModalContainer>
            <Icon src={StarIcon}/>
            <CloseButton onClick={onClose}>✕</CloseButton>
       
        <ContentWrapper>
          <Title>집콕력에 맞는 미션을 제공해요</Title>
          <ContentBox>
            <Content>한뭉치는 방안에서 할 수 있는 미션부터 시작해요</Content>
            <Content>두뭉치는 집안에서 할 수 있는 미션부터 시작해요</Content>
            <Content>세뭉치는 작은 외출 미션부터 시작해요</Content>
            <Content>네뭉치는 타인과 상호작용 미션부터 시작해요</Content>
          </ContentBox>
          <Text>
            성공한 미션이 쌓이면 {"\n"}
            다음 단계의 뭉치가 될 수 있어요.
          </Text>
          <FinishText>
            마지막 단계는 솜뭉치에요. {"\n"}
            이불 밖도 따뜻해요.
            </FinishText>
        </ContentWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default InfoModal;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: linear-gradient(to bottom, #2F0047, #856b9b);
  width: 75%; 
  aspect-ratio: 4 / 4.5; 
  border-radius: 12px;
  padding: 1.5rem 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3rem;
`;

const Icon=styled.img`
    height: 1.2rem;
    width: 1.2rem;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    transform: scale(0.85); /* 클릭 시 딸깍 효과 */
  }
`;


const ContentWrapper = styled.div`
  margin-top: 2rem; 
  background-color: transparent;
  height: 18.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title=styled.p`
    margin: 0;
    font-size: 0.85rem;
    color: white;
    font-weight: 550;
    letter-spacing: -0.5px;
`
const ContentBox=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40%;
    width: 100%;
`
const Content=styled.p`
    margin: 0;
    font-size: 0.65rem;
    font-weight: 550;
    letter-spacing: -0.5px;
    color: black;
    width: 100%;
    height: 1.4rem;
    background-color: white;
    line-height: 22px;
    border-radius: 16px;
`
const Text=styled.p`
    margin: 0;
    font-size: 0.65rem;
    letter-spacing: -0.5px;
    color: white;
    white-space: pre-line;
`
const FinishText=styled.p`
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: -0.5px;
    color: white;
    white-space: pre-line;
`