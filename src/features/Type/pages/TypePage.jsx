import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import HomeIcon from "../assets/HomeIcon.png";
import NextBt from "../assets/NextBt.png";

// 레벨별 GIF import
import moongchi1 from "../assets/Hanmoongchi.gif";
import moongchi2 from "../assets/Doomoongchi.gif";
import moongchi3 from "../assets/Hanmoongchi.gif";
import moongchi4 from "../assets/Hanmoongchi.gif";

const TypePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, level } = location.state || {};

  // level에 따른 유형 매핑
  const typeMap = {
    1: "한뭉치",
    2: "두뭉치",
    3: "세뭉치",
    4: "네뭉치"
  };

  const gifMap = {
    1: moongchi1,
    2: moongchi2,
    3: moongchi3,
    4: moongchi4
  };

  const userType = typeMap[level] || "..."; 
  const userGif = gifMap[level] || moongchi1;

  return (
    <Container>
      <Wrapper>
        <Icon src={HomeIcon} />
        <Text1>집콕 유형 테스트 결과</Text1>
      </Wrapper>
      <Box>
        <Gif src={userGif} alt="결과 GIF"/>
        <Type>{userType}</Type>
      </Box>
      <Text2>
        {nickname}님의 집콕 유형은 <Highlight>{userType}</Highlight> 에요.
      </Text2>
      <Text3>{userType}는 집콕력이 아주 높아요.</Text3>
      <Text4>방안에서 할 수 있는 미션부터 시작해요!</Text4>
      <NextButton
        src={NextBt}
        alt="Next"
        onClick={() => navigate("/serviceInfo1", { state: { nickname, level } })}
      />
    </Container>
  )
}

export default TypePage;

// styled-components 아래는 그대로
const Container = styled.div`
  background-color: #ECEAFF;
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
  padding: 2rem;
  gap: 0.7rem;
`;

const Icon = styled.img`
  height: 70%;
`;

const Box = styled.div`
  background-color: white;
  width: 100%;
  height: 25rem;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Gif = styled.img`
  height: 17rem;
`;

const Type = styled.p`
  background-color: #D1CDFF;
  margin: 0;
  padding: 0.3rem 0.6rem;
  border-radius: 36px;
  font-size: 1rem;
`;

const NextButton = styled.img`
  width: 1.9rem;
  position: absolute;
  bottom: 1.4rem;
  cursor: pointer;
`;

const Text1 = styled.p`
  margin: 0;
  color: #2F0047;
  font-size: 1.2rem;
`;

const Text2 = styled.p`
  margin: 3rem 0 0 0;
  font-size: 1rem;
  color: black;
`;

const Highlight = styled.span`
  background-color: white;
  border-radius: 36px;
  padding: 0.3rem;
`;

const Text3 = styled.p`
  margin: 0.8rem 0 0 0; 
  font-size: 0.7rem;
`;

const Text4 = styled.p`
  margin: 3rem 0 0 0; 
  color: #2F0047;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;
