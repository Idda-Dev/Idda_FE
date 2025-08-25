import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { userinfo } from "../mocks/userinfo"; 
import TabBar from "../components/TabBar";
import PurpleHomeIcon from "../assets/PurpleHomeIcon.png";
import Profile from "../features/Home/components/Profile";
import CandyCount from "../features/Home/components/CandyCount";
import BackgroundImg from "../features/Home/assets/BgImg.png";
import CouponIcon from "../features/Home/assets/CouponIcon.png"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          setUserData(userinfo);
        } else {
          const res = await axios.get(`${BASE_URL}/api/users/1`);
          setUserData(res.data);
        }
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("유저 정보를 불러오는 데 실패했습니다. 목데이터 사용");
        setUserData(userinfo);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Message>로딩중...</Message>;
  if (error) console.warn(error);

  

  return (
    <Container>
      <Background src={BackgroundImg} alt="배경 이미지" />
      <Icon>
        <Coupon src={CouponIcon} alt="쿠폰 아이콘" />
      </Icon>
      <Wrapper>
        {userData && (
          <>
            <CandyCount candy={userData.candy} />
            <Profile user={userData} />
          </>
        )}
      </Wrapper>
      <TabBar icons={{ home: PurpleHomeIcon }} backgroundColor="rgba(255, 255, 255, 0.9)" />
    </Container>
  );
};

export default MainPage;

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
  bottom: 0;             // 아래쪽 기준
  right: 0;              // 오른쪽 기준
  width: 100%;           // 확대
  height: 100%;          // 확대
  object-fit: cover;
  z-index: 0;
  object-position: right bottom; // 오른쪽 밑 모서리 기준
`;



const Icon = styled.div`
  position: absolute;
  top: 54%;
  left: 18%;
  transform: translate(-50%, -50%);
  width: 7rem;
  height: 7rem;
  max-width: 150px;  
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const Coupon = styled.img`
  height: 7rem;
  width: 6rem;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
  padding: 0 1.5rem;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
