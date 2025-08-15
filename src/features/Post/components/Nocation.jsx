import React from 'react'
import styled from 'styled-components';

const Nocation = () => {
  return (
    <Wrapper>
      <MyNocation>노량진동</MyNocation>
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
  display: inline-block;       /* 글자 길이에 맞게 폭 결정 */
  align-self: flex-start;      /* 부모가 flex일 때 왼쪽 정렬 */
  background-color: #D1CDFF;  /* 배경색 */
  padding: 0.3rem 1rem;     /* 글자와 배경 간격 */
  border-radius: 36px;         /* 모서리 둥글게 */
  font-size: 0.8rem;
  font-weight: 600;
`; 

export default Nocation;
