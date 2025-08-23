import React from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import Box from "../features/Shop/components/Box";
import ShopList from "../features/Shop/components/ShopList";
import CharacterProfile from "../features/Shop/components/CharacterProfile";
import styled from "styled-components";
import PurpleShopIcon from "../assets/PurpleShopIcon.png";

const ShopPage = () => {
  return (
    <Wrapper>
      <Header title="솜뭉치 가게" backPath="/" />
      <CharacterProfile />
      <Box />
      <ShopListWrapper>
        <ShopList />
      </ShopListWrapper>
      <TabBar icons={{ shop: PurpleShopIcon }} />
    </Wrapper>
  );
};

export default ShopPage;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  padding-top: 3.5rem; /* 헤더 높이 */
  padding-bottom: 1.5rem; /* 탭바 높이 */

  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopListWrapper = styled.div`
  flex: 1; /* 남은 공간 모두 차지 */
  width: 100%;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
