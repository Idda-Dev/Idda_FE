import React from 'react'
import styled from 'styled-components'
import { survey } from "./SurveyQuestions";

const Title = ({ questionIndex }) => {
  return (
    <Text>{survey[questionIndex].question}</Text>
  )
}

export default Title;

const Text = styled.p`
  font-size: 1.1rem;
  text-align: start;
  margin: 0;
  width: 75%;
  background-color: #D1CDFF;
  color: #2F0047;
  border-radius: 6px;
  padding: 0.8rem;
  white-space: pre-line; /* 줄바꿈(\n) 있는 질문도 반영 */
`
