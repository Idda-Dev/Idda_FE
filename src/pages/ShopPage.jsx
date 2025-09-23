import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import ShopList from "../features/Shop/components/ShopList";
import CharacterProfile from "../features/Shop/components/CharacterProfile";
import styled from "styled-components";
import PurpleShopIcon from "../assets/PurpleShopIcon.png";
import WhiteIcon from "../features/Shop/assets/WhiteIcon.png";

const ShopPage = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // 이전 페이지에서 전달된 userId

  return (
    <Wrapper>
      <Header
        title="솜뭉치 가게"
        backPath={-1}
        backgroundColor="#2F0047"
        color="#FFFFFF"
        backIcon={WhiteIcon}
        userId={userId}
      />
      <CharacterProfile userId={userId} />
      <ShopListWrapper>
        <ShopList userId={userId} />
      </ShopListWrapper>
      <TabBar icons={{ shop: PurpleShopIcon }} userId={userId} />
    </Wrapper>
  );
};

export default ShopPage;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 3.5rem; /* 헤더 높이 */
  padding-bottom: 0;

  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopListWrapper = styled.div`
  flex: 1; /* 남은 공간 모두 차지 */
  width: 100%;
  padding: 0 3rem 1.4rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
