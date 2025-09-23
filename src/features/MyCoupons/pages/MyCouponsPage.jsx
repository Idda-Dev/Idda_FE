import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header';
import Coupons from '../components/Coupons';
import { mycoupons } from "../../../mocks/mycoupons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyCouponsPage = () => { 
  const location = useLocation();
  const { userId } = location.state || {};   // ← 라우터 state로 userId 받음

  const [activeTab, setActiveTab] = useState(1); // 1: 보유, 2: 완료/만료
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchCoupons = async () => {
      setLoading(true);
      try {
        let allCoupons = [];
        if (!BASE_URL) {
          allCoupons = mycoupons;
        } else {
          const res = await axios.get(`${BASE_URL}/api/users/${userId}/coupons`);
          allCoupons = res.data;
        }
        setCoupons(allCoupons);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setCoupons(mycoupons);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId]);

  const claimedCoupons = coupons.filter(c => c.status === "CLAIMED");
  const usedCoupons = coupons.filter(c => c.status === "USED");

  if (!userId) return <div>⚠ 사용자 정보가 없습니다.</div>;
  if (loading) return <div>로딩중...</div>;

  return (
    <Container>
      <Header title="내 쿠폰" backPath="-1" />

      <ButtonGroup>
        <TabButton $active={activeTab === 1} onClick={() => setActiveTab(1)}>보유</TabButton>
        <TabButton $active={activeTab === 2} onClick={() => setActiveTab(2)}>완료/만료</TabButton>
      </ButtonGroup>

      <ContentWrapper>
        <InnerContent>
          {activeTab === 1 
            ? <Coupons items={claimedCoupons} activeTab={activeTab} userId={userId} /> 
            : <Coupons items={usedCoupons} activeTab={activeTab} userId={userId} />}
        </InnerContent>
      </ContentWrapper>
    </Container>
  );
};

export default MyCouponsPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.9rem 0;
  font-size: 1rem;
  font-weight: 550;
  background: transparent;
  border: none;
  border-bottom: 0.2rem solid
    ${({ $active }) => ($active ? "black" : "#D1CDFF")};
  color: ${({ $active }) => ($active ? "black" : "#7F7F7F")};
  cursor: pointer;

  &:focus { outline: none; }

  &:hover {
    border-bottom-color: ${({ $active }) => ($active ? "black" : "#D1CDFF")};
    color: ${({ $active }) => ($active ? "black" : "#7F7F7F")};
    background: transparent;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const InnerContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;
