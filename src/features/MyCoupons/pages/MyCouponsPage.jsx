import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../../components/Header';
import Coupons from '../components/Coupons';
import { mycoupons } from "../../../mocks/mycoupons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// userId = 1 설정
const userId = 1;

const MyCouponsPage = () => {
  const [activeTab, setActiveTab] = useState(1); // 1: 보유, 2: 완료/만료
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        let allCoupons = [];
        if (!BASE_URL) {
          console.warn("⚠️ BASE_URL이 설정되지 않았습니다. → 목데이터 사용");
          allCoupons = mycoupons;
        } else {
          const res = await axios.get(`${BASE_URL}/api/users/${userId}/coupons`);
          allCoupons = res.data;
        }
        setCoupons(allCoupons);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setCoupons(mycoupons); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const claimedCoupons = coupons.filter(coupon => coupon.status === "CLAIMED");
  const usedCoupons = coupons.filter(coupon => coupon.status === "USED");

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <Container>
      <Header title="내 쿠폰" backPath="/shop" />

      <ButtonGroup>
        <TabButton 
          active={activeTab === 1} 
          onClick={() => setActiveTab(1)}>
          보유
        </TabButton>
        <TabButton 
          active={activeTab === 2} 
          onClick={() => setActiveTab(2)}>
          완료/만료
        </TabButton>
      </ButtonGroup>

      <ContentWrapper>
        <InnerContent>
          {activeTab === 1 ? (
            <Coupons items={claimedCoupons} activeTab={activeTab} />
          ) : (
            <Coupons items={usedCoupons} activeTab={activeTab} />
          )}
        </InnerContent>
      </ContentWrapper>
    </Container>
  )
}

export default MyCouponsPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 3.5rem; // 헤더 높이만큼 띄움
  box-sizing: border-box;
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
    ${({ active }) => (active ? "black" : "#D1CDFF")}; 
  color: ${({ active }) => (active ? "black" : "#7F7F7F")};
  cursor: pointer;

  border-radius: 0; 

  &:focus {
    outline: none;  
  }

  &:hover {
    border-bottom-color: ${({ active }) => (active ? "black" : "#D1CDFF")};
    color: ${({ active }) => (active ? "black" : "#7F7F7F")};
    background: transparent; 
  }

  &:active {
    outline: none;
    background: transparent;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 1rem 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
`;

const InnerContent = styled.div`
  flex: 1; 
  width: 100%;
  overflow-y: auto; 
  box-sizing: border-box;
`;