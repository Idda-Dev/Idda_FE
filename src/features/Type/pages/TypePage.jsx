// pages/TypePage.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../../store/useUserStore"; // ← 경로 확인!

import HomeIcon from "../assets/HomeIcon.png";
import NextBt from "../assets/NextBt.png";
import moongchi1 from "../assets/Hanmoongchi.gif";
import moongchi2 from "../assets/Doomoongchi.gif";
import moongchi3 from "../assets/Hanmoongchi.gif";
import moongchi4 from "../assets/Hanmoongchi.gif";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TypePage = () => {
  const navigate = useNavigate();

  // zustand에서만 읽기
  const {
    userId,
    nickname,
    level,
    setUser, // 보충 저장
  } = useUserStore();

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

  const typeMap = { 1: "한뭉치", 2: "두뭉치", 3: "세뭉치", 4: "네뭉치" };
  const gifMap = { 1: moongchi1, 2: moongchi2, 3: moongchi3, 4: moongchi4 };

  const userType = typeMap[level] || "...";
  const userGif = gifMap[level] || moongchi1;

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
      <Text3>{userType}는 집콕력이 아주 높아요.</Text3>
      <Text4>방안에서 할 수 있는 미션부터 시작해요!</Text4>

      <NextButton src={NextBt} alt="Next" onClick={handleNext} />
    </Container>
  );
};

export default TypePage;

/* ====================== styles ====================== */
const Container = styled.div`
  background-color: #eceaff;
  width: 100%;
  height: 100dvh; /* 모바일 주소창 대응 */
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
  color: #2f0047;
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
  color: #2f0047;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;
