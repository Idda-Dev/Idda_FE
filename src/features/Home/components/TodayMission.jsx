import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import StarIcon from "../assets/StarIcon.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userId = 1;

const TodayMission = () => {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const contentRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const fetchMission = async () => {
      setLoading(true);
      setError(null);

      try {
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

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      setIsOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [mission]);

  const toggleExpand = () => {
    if (isOverflow) setIsExpanded(!isExpanded);
  };

  if (loading) return <Wrapper>로딩중...</Wrapper>;
  if (error) return <Wrapper>{error}</Wrapper>;

  return (
    <Wrapper>
      <Container>
        <Icon src={StarIcon} />
        <Title>미션</Title>
      </Container>
      <Content
  ref={contentRef}
  onClick={toggleExpand}
  $isExpanded={isExpanded}
  $isOverflow={isOverflow}
>
  {mission?.content || "오늘의 미션이 없습니다."}
</Content>

    </Wrapper>
  );
};

export default TodayMission;

const Wrapper = styled.div`
  background-color: transparent;
  width: 16.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
  z-index: 2;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
  border-right: 1px solid black;
  gap: 0.4rem;
  border-radius: 0 0 0 12px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 550;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
`;

const Content = styled.p`
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0;
  width: 60%;
  font-size: 0.8rem;
  font-weight: 550;
  padding: 0.5rem;

  /* border-radius 조건부: 확장 상태일 때만 왼쪽 아래 12px */
  border-radius: ${({ $isExpanded }) =>
    $isExpanded ? "0 0 12px 12px" : "0 0 12px 0"};

  /* 줄임표 한 줄 처리 */
  display: block;
  white-space: ${({ $isExpanded }) => ($isExpanded ? "normal" : "nowrap")};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${({ $isOverflow }) => ($isOverflow ? "pointer" : "default")};

  text-align: left;
`;




const Icon = styled.img`
  width: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
