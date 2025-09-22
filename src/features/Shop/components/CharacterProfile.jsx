import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Candy from "../assets/Candy.png";
import ProfileImg from "../assets/ProfileImg.png";
import { userinfo } from "../../../mocks/userinfo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CharacterProfile = ({ userId }) => { 
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const goToCoupon = () => {
    navigate("/coupon", { state: { userId } }); 
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          setUserInfo(userinfo);
          return;
        }

        if (!userId) throw new Error("userId가 전달되지 않았습니다.");

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

// Styled-components 그대로 유지
const Container = styled.div`
  height: 27%;
  width: 100%;
  background: linear-gradient(to bottom, #2f0047, #624273);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding: 0 1rem;
  position: relative;
`;

const Profile = styled.img`
  width: 16rem;
  height: auto;
  border-radius: 50%;
  position: relative;
  bottom: -2rem;
  z-index: 2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  position: relative;
  top: -1.5rem;
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
  height: 1.3rem;
  right: 1rem;
  width: auto;
`;

const MyCandy = styled.p`
  font-size: 0.65rem;
  font-weight: 500;
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
