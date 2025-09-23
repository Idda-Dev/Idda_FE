import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { userinfo } from "../mocks/userinfo";
import Profile from "../features/Home/components/Profile";
import CandyCount from "../features/Home/components/CandyCount";
import BackgroundImg from "../features/Home/assets/BgImg.png";
import TodayMission from "../features/Home/components/TodayMission";
import useUserStore from "../store/useUserStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MainPage = () => {
  const { userId } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 없음 → 목데이터 사용");
          setUserData(userinfo);
        } else {
          if (!userId) throw new Error("userId가 없음");
          const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
          setUserData(res.data);
        }
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("유저 정보 불러오기 실패 → 목데이터 사용");
        setUserData(userinfo);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Message>로딩중...</Message>;
  if (error) console.warn(error);

  return (
    <Container>
      <Background src={BackgroundImg} alt="배경" />
      <Wrapper>
        {userData && (
          <>
            <CandyCount candy={userData.candy} />
            <Profile user={userData} />
            <TodayMission userId={userId} />
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default MainPage;

/* ================= styled ================= */
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const Background = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  padding: 0 1.5rem;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
