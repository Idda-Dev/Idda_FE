import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Candy from "../assets/Candy.png";
import ProfileImg from "../assets/ProfileImg.png";
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

  if (loading) return <div>로딩중...</div>;
  if (!userInfo) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  return (
    <Container>
      <Profile src={ProfileImg} />
      <Content>
        <Wrapper>
          <Icon src={Candy} />
          <MyCandy>{userInfo.candy}개</MyCandy>
        </Wrapper>
        <Button onClick={goToCoupon}>내 쿠폰함 가기</Button>
      </Content>
    </Container>
  );
};

export default CharacterProfile;

const Container = styled.div`
  height: 27%;
  width: 100%;
  background: linear-gradient(to bottom, #2f0047, #624273);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end; /* 이미지가 아래로 나오도록 */
  margin-bottom: 2rem; /* 프로필 이미지 아래로 튀어나오는 공간 확보 */
  padding: 0 1rem;
  position: relative;
`;

const Profile = styled.img`
  width: 16rem;
  height: auto;
  border-radius: 50%;
  position: relative;
  bottom: -2rem; /* 보라색 영역 아래로 튀어나오게 */
  z-index: 2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  position: relative;
  top: -1.5rem; /* 위로 올라가도록 조정 */
  right: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 5.5rem;
  height: 1.5rem;
  background-color: white;
  align-items: center;
  border-radius: 16px;
  padding-right: 0.6rem;
`;

const Icon = styled.img`
  height: 1.4rem;
  right: 1rem;
  width: auto;
`;

const MyCandy = styled.p`
  font-size: 0.65rem;
  font-weight: 550;
  color: black;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border-radius: 16px;
  font-size: 0.6rem;
  font-weight: 550;
  cursor: pointer;
  width: 5.5rem;
  height: 1.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }
`;
