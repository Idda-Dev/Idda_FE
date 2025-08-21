import React from 'react';
import styled from 'styled-components';
import Coupon from './Coupon';

const Coupons = ({ items, activeTab }) => {
  if (!items || items.length === 0) {
    return <div>쿠폰이 없습니다.</div>;
  }

  return (
    <Container>
      {items.map((item) => (
        <Coupon key={item.memberCouponId} item={item} activeTab={activeTab} />
      ))}
    </Container>
  );
};

export default Coupons;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;