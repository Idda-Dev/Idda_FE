import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LeeSeoyoonFont from "../../../../public/fonts/이서윤체.ttf";

import useUserStore from "../../../store/useUserStore"; 
import HomeIcon from "../assets/HomeIcon.png";
import NextBt from "../assets/NextBt.png";
import moongchi1 from "../assets/Hanmoongchi.gif";
import moongchi2 from "../assets/Doomoongchi.gif";
import moongchi3 from "../assets/Semoongchi.gif";
import moongchi4 from "../assets/Nemoongchi.gif";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TypePage = () => {
  const navigate = useNavigate();

  // zustand에서만 읽기
  const { userId, nickname, level, setUser } = useUserStore();

  // 1) userId 없으면 로그인으로
  useEffect(() => {
    if (!userId) navigate("/");
  }, [userId, navigate]);

  // 2) nickname/level 없으면 1회 API로 보충
  useEffect(() => {
    const hydrateIfNeeded = async () => {
      if (!userId) return;
      if (nickname && level) return;
      try {
        const { data } = await axios.get(`${BASE_URL}/api/users/${userId}`);
        // 서버 응답 예: { memberId, nickname, level, ... }
        setUser({
          memberId: data.memberId ?? userId,
          nickname: data.nickname ?? nickname,
          level: data.level ?? level,
        });
      } catch (e) {
        console.error("TypePage 유저 보충 실패:", e);
      }
    };
    hydrateIfNeeded();
  }, [userId, nickname, level, setUser]);

  const typeMap = {
    1: "한뭉치",
    2: "두뭉치",
    3: "세뭉치",
    4: "네뭉치",
  };

  const gifMap = {
    1: moongchi1,
    2: moongchi2,
    3: moongchi3,
    4: moongchi4,
  };

  const missionTextMap = {
    1: "방안에서 할 수 있는",
    2: "집안에서 할 수 있는",
    3: "작은 외출 하는",
    4: "타인과 상호작용하는",
  };

  const userType = typeMap[level] || "...";
  const userGif = gifMap[level] || moongchi1;
  const missionText = missionTextMap[level] || "방안에서 할 수 있는";

  const handleNext = async () => {
    if (!userId) {
      navigate("/");
      return;
    }
    // 미션 생성은 비동기 백그라운드로
    axios
      .post(`${BASE_URL}/api/users/${userId}/missions`, {})
      .then((res) => console.log("✅ 미션 생성", res.data))
      .catch((err) => console.error("❌ 미션 생성 실패:", err));

    // 스토어만 믿고 이동 (state 없이)
    navigate("/serviceInfo1");
  };

  return (
    <Container>
      <FontStyle />
      <Wrapper>
        <Icon src={HomeIcon} alt="home" />
        <Text1>집콕 유형 테스트 결과</Text1>
      </Wrapper>

      <Box>
        <Gif src={userGif} alt="결과 GIF" />
        <TypeBadge>{userType}</TypeBadge>
      </Box>

      <Text2>
        {nickname}님의 집콕 유형은 <Highlight>{userType}</Highlight> 에요.
      </Text2>

      <Text4>{missionText} 미션부터 시작해요!</Text4>

      <NextButton src={NextBt} alt="Next" onClick={handleNext} />
    </Container>
  );
};

export default TypePage;

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'LeeSeoyoon';
    src: url(${LeeSeoyoonFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const Container = styled.div`
  background-color: #eceaff;
  width: 100%;
  height: 100dvh;
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

const TypeBadge = styled.p`
  background-color: #d1cdff;
  margin: 0;
  padding: 0.3rem 0.6rem;
  border-radius: 36px;
  font-size: 1.1rem;
  font-family: "LeeSeoyoon";
`;

const NextButton = styled.img`
  width: 1.9rem;
  position: absolute;
  bottom: 1.4rem;
  cursor: pointer;
`;

const Text1 = styled.p`
  margin: 0;
  color: #2f0047;
  font-size: 1.3rem;
  font-family: "LeeSeoyoon";
`;

const Text2 = styled.p`
  margin: 4rem 0 0 0;
  font-size: 1rem;
  color: black;
`;

const Highlight = styled.span`
  background-color: white;
  border-radius: 36px;
  padding: 0.3rem;
  font-family: "LeeSeoyoon";
`;

const Text4 = styled.p`
  margin: 2rem 0 0 0;
  color: #2f0047;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
  font-family: "LeeSeoyoon";
  font-size: 1.2rem;
`;
