import React from 'react';
import styled from 'styled-components';

const Location = ({ location }) => {
  return (
    <Wrapper>
      <MyNocation>{location}</MyNocation>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`

const MyNocation = styled.span`
  display: inline-block;
  align-self: flex-start;
  background-color: #D1CDFF;
  padding: 0.3rem 1rem;
  border-radius: 36px;
  font-size: 0.8rem;
  font-weight: 600;
`; 

export default Location;
