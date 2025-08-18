import React from 'react'
import styled from 'styled-components';
import CouponHeader from '../components/CouponHeader';


const MyCouponsPage = () => {
  return (
    <Container>
        <CouponHeader/>
    </Container>
  )
}

export default MyCouponsPage;

const Container=styled.div`
    width: 100%;
`