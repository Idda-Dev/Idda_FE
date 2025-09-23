import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import StarIcon from "../assets/Star.png";

const FirstPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, level, userId, user } = location.state || {};

  console.log("✅ FirstPage → nickname:", nickname, "level:", level, "userId:", userId, "user:", user);

  return (
    <Container onClick={() => navigate("/serviceInfo1/serviceInfo2", { state: { nickname, level, userId, user } })}>
        <Wrapper1>
            <Star src={StarIcon} alt="Star" /> 
            <Text1>성공한 미션들이 쌓이면 <br />다음 단계의 뭉치가 될 수 있어요.</Text1> 
            <Wrapper2> 
                <Box>한뭉치는 방안에서 할 수 있는 미션부터 시작해요</Box> 
                <Box>두뭉치는 집안에서 할 수 있는 미션부터 시작해요</Box> 
                <Box>세뭉치는 작은 외출 미션부터 시작해요</Box> 
                <Box>네뭉치는 타인과 상호작용 미션부터 시작해요</Box> 
            </Wrapper2> 
        </Wrapper1>
            <Text2>마지막 단계는 솜뭉치에요.<br/>이불밖도 따뜻해요.</Text2> 
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
    padding-top: 7rem;
    padding-bottom: 5rem;
    background: linear-gradient(to bottom, #2F0047, #856b9b);
    cursor: pointer; 
`

const Star=styled.img`
    width: 1.4rem;
    object-fit: cover;
    margin-bottom: 2rem;
`

const Wrapper1=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`


const Wrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 18.5rem;
    height: 12rem;
    margin-top: 6rem;
`

const Box=styled.div`
    background-color: white;
    padding: 0.4rem 0;
    border-radius: 36px;
    font-size: 0.9rem;
    font-weight: 550;
`

const Text1 = styled.p`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 550;
    color: white;
`

const Text2 = styled.p`
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
`
