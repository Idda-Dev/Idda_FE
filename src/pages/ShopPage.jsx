import React from "react";
import ShopHeader from "../features/Shop/components/ShopHeader";
import TabBar from "../components/TabBar";
import Box from "../features/Shop/components/Box";
import ShopList from "../features/Shop/components/ShopList";
import styled from "styled-components";

const ShopPage = () => {
  return (
    <Wrapper>
      <ShopHeader/>
      <Box/>
      <ShopList/>
      <TabBar/>
    </Wrapper>
  );
};

export default ShopPage;

const Wrapper = styled.div`
  width: 100%;
`