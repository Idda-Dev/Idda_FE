import React, { useState } from 'react'
import styled from 'styled-components';
import CouponHeader from '../components/CouponHeader';
import Coupons from '../components/Coupons';

const MyCouponsPage = () => {
  const [activeTab, setActiveTab] = useState(1); // 1 or 2

  return (
    <Container>
      <CouponHeader />

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
            {activeTab === 1 ? <Coupons /> : <Coupons />}
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
  padding-top: 52px; // 헤더 높이만큼 띄움
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
  overflow: hidden; // 내부 컴포넌트가 패딩 침범 못하게
`;

const InnerContent = styled.div`
  flex: 1; 
  width: 100%;
  overflow-y: auto; 
  box-sizing: border-box;
`;
