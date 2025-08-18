import React from 'react'
import styled from 'styled-components'
import Coupon from './Coupon'

const UsedCoupons = () => {
  return (
    <Container>
      <Coupon/>
      <Coupon/>
      <Coupon/>
      <Coupon/>
      <Coupon/>
      <Coupon/>
    </Container>
  )
}

export default UsedCoupons;

const Container=styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`