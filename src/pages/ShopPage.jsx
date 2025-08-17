import React from "react";
import ShopHeader from "../features/Shop/components/ShopHeader";
import TabBar from "../components/TabBar";
import Box from "../features/Shop/components/Box";
import ShopList from "../features/Shop/components/ShopList";
import CharacterProfile from "../features/Shop/components/CharacterProfile";
import styled from "styled-components";
import PurpleShopIcon from "../assets/PurpleShopIcon.png"

const ShopPage = () => {
  return (
    <Wrapper>
      <ShopHeader />
      <CharacterProfile />
      <Box />
      <ShopListWrapper>
        <ShopList />
      </ShopListWrapper>
      <TabBar 
      icons={{ shop: PurpleShopIcon }}/>
    </Wrapper>
  );
};

export default ShopPage;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  padding-top: 52px;      /* 헤더 높이 */
  padding-bottom: 1.5rem; /* 탭바 높이 */

  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopListWrapper = styled.div`
  flex: 1;          /* 남은 공간 모두 차지 */
  width: 73%;
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
`;
