import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BackgroundImg from "../assets/Background.png" 
import TitleBgImg from "../assets/TitleBackground.png"       
import TextBgImg from "../assets/TalkIcon.png"

const SecondPage = () => {
  const location = useLocation();
  const { nickname, level } = location.state || {};

  return (
    <Container>
        <TitleWrapper>
          <TitleBackground src={TitleBgImg} alt="title-bg" />
          <Title>매일 작은 미션에 도전해요</Title>
        </TitleWrapper>
        
        <Text1>"매일 예상하지 못한 미션이 나와서<br />도전하는 재미가 있어요."</Text1>
        <Content>서로의 미션 인증글에 응원을 남겨보세요</Content>
        <TextWrapper>
          <TextBackground src={TextBgImg} alt="text-bg" />
          <Text2>
            "나랑 비슷한 사람들이 있다는 사실 <br />
            자체만으로도 위로가 됐어요."
          </Text2>
        </TextWrapper>

        <Content>
          미션인증으로 솜뭉치를 모아 <br />인근 가게의 할인쿠폰을 구입할 수 있어요.
        </Content>

        <Box>
          {nickname}님의 레벨: {level} <br />
          한걸음씩, 이불 밖도 따뜻한 세상으로<br />
          나갈 습관을 함께 만들어 봐요!
        </Box>
    </Container> 
  )
}

export default SecondPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BackgroundImg}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 6rem;
  padding-bottom: 7rem;
  padding-left: 2rem;
  padding-right: 2rem;
`

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  width: 17rem;
`

const TitleBackground = styled.img`
  width: 100%;
  height: auto;
`

const Title = styled.p`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 46%;
  left: 58%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  text-align: center;
`

const Text1 = styled.p`
  margin: 0;
  font-size: 0.8rem;
  text-align: right;
  width: 100%;
  color: #2F0047;
`

const TextWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
`

const TextBackground = styled.img`
  width: 13rem;
  height: auto;
`

const Text2 = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  font-size: 0.8rem;
  color: #2F0047;
  text-align: left;
  width: 11rem;     
`

const Content = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: center;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 77%;
  height: 4rem;
  background: #E4E0F6;
  border-radius: 30px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
  color: #2F0047;
`
