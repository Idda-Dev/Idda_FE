import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import CharacterIcon from "../assets/Photo.png";
import Candy from "../assets/Candy.png";
import { userinfo } from "../../../mocks/userinfo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CharacterProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  const goToCoupon = () => {
    navigate("/coupon");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          setUserInfo(userinfo);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        setUserInfo(res.data);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setUserInfo(userinfo);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]); 

  if (loading) {
    return <div>로딩중...</div>;
  }
  
  if (!userInfo) {
      return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <Container>
      <Profile src={userInfo.profileImageUrl} />
      <Content>
        <Wrapper>
          <Icon src={Candy} />
          <MyCandy>보유 솜사탕 {userInfo.candy}개</MyCandy>
        </Wrapper>
        <Button onClick={goToCoupon}>내 쿠폰함 가기</Button>
      </Content>
    </Container>
  );
}

export default CharacterProfile;

// 기존 스타일 그대로
const Container = styled.div`
  height: 21%;
  width: 73%;
  background-color: #2F0047;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1.5rem;
`;

const Profile = styled.img`
  height: 5.8rem;
  width: 5.8rem;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 5.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  align-items: center; 
  gap:0.4rem;
`;

const Icon = styled.img`
  height: 1.6rem;
  width: auto;
`;

const MyCandy = styled.p`
  font-size: 0.65rem;
  font-weight: 550;
  color: white;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border-radius: 16px;
  font-size: 0.6rem;
  font-weight: 550;
  cursor: pointer;
  width: 70%; 
  height: 1.5rem; 
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;
