import React from 'react'
import styled from 'styled-components'

const Title = () => {
  return (
    <Text>나는 사랑과 보호를 받지 못한다고 느낀다</Text>
  )
}

export default Title;

const Text=styled.p`
    text-align: center;
    margin: 0;
    width: 75%;
    background-color: #D1CDFF;
    color: #2F0047;
    border-radius: 6px;
    padding: 0.8rem;
`