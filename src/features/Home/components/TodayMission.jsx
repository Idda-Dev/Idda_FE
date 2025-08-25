import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import StarIcon from "../assets/StarIcon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userId = 1; // 1번 유저

const TodayMission = () => {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMission = async () => {
      setLoading(true);
      setError(null);

      try {
        // 오늘 날짜 계산 (KST 기준)
        const now = new Date();
        const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const formattedDate = kstDate.toISOString().split("T")[0];

        const res = await axios.get(
          `${BASE_URL}/api/users/${userId}/missions?date=${encodeURIComponent(formattedDate)}`
        );

        setMission(res.data);
      } catch (err) {
        console.error("미션 정보를 불러오는데 실패했습니다:", err);
        setError("오늘의 미션을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, []);

  if (loading) return <Wrapper>로딩중...</Wrapper>;
  if (error) return <Wrapper>{error}</Wrapper>;

  return (
    <Wrapper>
      <Container>
        <Icon src={StarIcon} />
        <Title>미션</Title>
      </Container>
      <Content>{mission?.content || "오늘의 미션이 없습니다."}</Content>
    </Wrapper>
  );
};

export default TodayMission;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 16.2rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: white;
  z-index: 2;
  border-radius: 0 0 12px 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  border-right: 1px solid black;
  gap: 0.4rem;
`;

const Icon = styled.img`
  height: 1rem;
`;

const Title = styled.p`
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 550;
`;

const Content = styled.p`
  margin: 0;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 550;
`;
