import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가
import { userinfo } from "../mocks/userinfo"; 
import TabBar from "../components/TabBar";
import PurpleHomeIcon from "../assets/PurpleHomeIcon.png";
import Profile from "../features/Home/components/Profile";
import CandyCount from "../features/Home/components/CandyCount";
import BackgroundImg from "../features/Home/assets/MainPageImage.png";
import CouponIcon from "../features/Home/assets/CouponIcon.png"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MainPage = () => {
  const navigate = useNavigate(); // 추가
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

  // 클릭 핸들러
  const handleCouponClick = () => {
    navigate("/coupon");
  };

  return (
    <Container>
      <Background src={BackgroundImg} alt="배경 이미지" />
      <Icon onClick={handleCouponClick}>
        <Coupon src={CouponIcon} alt="쿠폰 아이콘" />
        <Name>쿠폰함</Name>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  object-position: center;
`;

const Icon = styled.div`
  position: absolute;
  top: 62%;
  left: 33%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  max-width: 150px;  
  cursor: pointer;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Coupon = styled.img`
  height: 7rem;
  width: 6rem;
`;

const Name = styled.p`
  position: absolute; // 절대 위치
  top: 70%;          // 아이콘 중앙
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 4rem;
  font-weight: 500;
  font-size: 0.7rem;
  padding: 0.3rem;
  border-radius: 16px;
  text-align: center;
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
