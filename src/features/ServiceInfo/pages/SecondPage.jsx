import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import starIcon from "../assets/Star.png";
import step1 from "../assets/Step1.png";
import step2 from "../assets/Step2.png";

const SecondPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, level, userId, user } = location.state || {};

  console.log(
    "✅ SecondPage → nickname:",
    nickname,
    "level:",
    level,
    "userId:",
    userId,
    "user:",
    user
  );

  const handleNavigate = () => {
    navigate("/main", { state: { userId, user } });
  };

  return (
    <Container onClick={handleNavigate}>
      <TitleWrapper>
        <Star src={starIcon} />
        <Title>매일 작은 미션에 도전해요</Title>
      </TitleWrapper>
      <ContentWrapper>
        <Wrapper>
          <Text>STEP1</Text>
          <Icon1 src={step1} />
          <Content>미션 인증글에 응원을 남겨 보세요.</Content>
        </Wrapper>
        <Wrapper>
          <Text>STEP2</Text>
          <Icon2 src={step2} />
          <Content>
            미션 인증으로 솜뭉치를 모아 인근 가게의 <br />
            할인 쿠폰을 구입해요.
          </Content>
        </Wrapper>
      </ContentWrapper>
      <Box>
        한걸음씩, 이불 밖도 따뜻한 세상으로
        <br />
        나갈 습관을 함께 만들어 봐요!
      </Box>
    </Container>
  );
};

export default SecondPage;

/* styled-components 동일 */
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #2f0047, #856b9b);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 3.2rem;
  padding-bottom: 1.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
  cursor: pointer; /* ✅ 클릭 가능하게 */
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Star = styled.img`
  width: 1.4rem;
`;

const Title = styled.div`
  margin: 0;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Text = styled.div`
  margin: 0 0 0.8rem 0;
  background: #d1cdff;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  color: #2f0047;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Icon1 = styled.img`
  width: 11rem;
`;

const Icon2 = styled.img`
  width: 8.5rem;
`;

const Content = styled.div`
  margin: 1rem 0;
  color: white;
  font-size: 0.9rem;
  font-weight: 550;
  text-align: start;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  height: 3.3rem;
  margin-top: 1rem;
  background: #e4e0f6;
  border-radius: 30px;
  text-align: center;
  font-weight: 550;
  font-size: 0.9rem;
  color: #2f0047;
`;
