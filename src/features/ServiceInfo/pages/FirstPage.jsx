import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import StarIcon from "../assets/Star.png";

const FirstPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, level } = location.state || {};

  const handleClick = () => {
    navigate("/serviceInfo1/serviceInfo2", { state: { nickname, level } });
  }

  return (
    <Container onClick={handleClick}>
        <Star src={StarIcon} alt="Star" />
        <TextWrapper>
            <Text1>성공한 미션들이 쌓이면 다음 뭉치가 될 수 있어요.</Text1>
            <Text2>한뭉치 - 두뭉치 - 세뭉치 - 네뭉치</Text2>
            <Text3>✨ {nickname} 님의 현재 레벨은 {level} 입니다 ✨</Text3>
        </TextWrapper>
        <Wrapper>
            <Box>한뭉치는 방안에서 할 수 있는 미션부터 시작해요</Box>
            <Box>두뭉치는 집안에서 할 수 있는 미션부터 시작해요</Box>
            <Box>세뭉치는 작은 외출 미션부터 시작해요</Box>
            <Box>네뭉치는 타인과 상호작용 미션부터 시작해요</Box>
        </Wrapper>
        <TextWrapper>
            <Text2>마지막 단계는 솜뭉치에요.</Text2>
            <Text3>
                모든 유형의 미션을 받으며<br />
                이불 밖으로 나가보아요 :
            </Text3>
        </TextWrapper>
    </Container>
  )
}

export default FirstPage;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 6rem;
    padding-bottom: 5rem;
    background-color: #ECEAFF;
    cursor: pointer; /* 클릭 가능 표시 */
`

const Star=styled.img`
    width: 1.4rem;
    object-fit: cover;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20rem;
    height: 13rem;
`

const Box=styled.div`
    background-color: white;
    padding: 0.5rem 0;
    border-radius: 36px;
    font-size: 0.9rem;
    font-weight: 550;
`

const Text1 = styled.p`
    margin: 0;
    font-size: 0.8rem;
`

const Text2 = styled.p`
    margin: 0;
    font-size: 1.2rem;
`

const Text3 = styled.p`
    margin: 0;
    font-size: 0.9rem;
`
