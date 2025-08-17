// ShopList.jsx
import React from 'react'
import styled from 'styled-components';
import ShopListItem from './ShopListItem';

const ShopList = () => {
  return (
    <Container>
      <ShopListItem/>
      <ShopListItem/>
      <ShopListItem/>
      <ShopListItem/>
      <ShopListItem/>
    </Container>
  )
}

export default ShopList;

const Container = styled.div`
  background-color: transparent;
  width: 100%;
`
