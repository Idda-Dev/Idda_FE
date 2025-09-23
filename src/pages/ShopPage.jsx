import React from "react";
import styled from "styled-components";
import useUserStore from "../store/useUserStore";

import Header from "../components/Header";
import ShopList from "../features/Shop/components/ShopList";
import CharacterProfile from "../features/Shop/components/CharacterProfile";
import WhiteIcon from "../features/Shop/assets/WhiteIcon.png";

const ShopPage = () => {
  const userId = useUserStore((s) => s.userId);

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
    </Wrapper>
  );
};

export default ShopPage;

/* ================= styled ================= */
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
  flex: 1;
  width: 100%;
  padding: 0 3rem 1.4rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
